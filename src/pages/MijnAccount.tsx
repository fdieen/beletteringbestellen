import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Package, Calendar, Ruler, Euro, User, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface DesignData {
  text?: string;
  font?: string;
  color?: string;
}

interface Order {
  id: string;
  product_name: string;
  width_cm: number;
  height_cm: number;
  price: number;
  design_data: DesignData;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels: Record<string, string> = {
  pending: 'In afwachting',
  processing: 'In productie',
  shipped: 'Verzonden',
  delivered: 'Bezorgd',
  cancelled: 'Geannuleerd'
};

export default function MijnAccount() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const typedOrders: Order[] = (data || []).map(order => ({
        ...order,
        design_data: (order.design_data as DesignData) || {}
      }));
      setOrders(typedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        variant: 'destructive',
        title: 'Fout',
        description: 'Kon bestellingen niet laden.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Uitgelogd',
      description: 'Je bent succesvol uitgelogd.'
    });
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        <main className="flex-1 section-container py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 selection:bg-primary/10 selection:text-primary">
      <Header />
      
      <main className="flex-1 section-container py-8 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-background" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Mijn Account</h1>
              <p className="text-muted-foreground text-sm font-medium">{user?.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="rounded-xl border-2 font-bold"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Uitloggen
          </Button>
        </div>

        {/* Orders Section */}
        <div className="card-premium">
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-black">Mijn Bestellingen</h2>
                <p className="text-muted-foreground text-sm">Bekijk hier al je bestellingen en hun status</p>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-20 h-20 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black">Nog geen bestellingen</h3>
                  <p className="text-muted-foreground">
                    Je hebt nog geen bestellingen geplaatst.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-8 py-3 rounded-xl shadow-lg shadow-primary/20"
                >
                  Ontwerp je eerste sticker
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const designData = order.design_data || {};

  return (
    <div className="border-2 border-border rounded-2xl p-5 md:p-6 hover:border-primary/30 hover:shadow-lg transition-all bg-background">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Preview */}
        <div
          className="w-full md:w-48 h-24 rounded-xl flex items-center justify-center overflow-hidden bg-muted"
        >
          <svg
            viewBox="0 0 200 50"
            className="w-full h-full"
            style={{ maxHeight: '80px' }}
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={designData.color || '#000000'}
              fontFamily={designData.font || 'Arial'}
              fontSize="24"
            >
              {designData.text || 'Sticker'}
            </text>
          </svg>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-black text-lg">{order.product_name}</h3>
            <Badge className={`${statusColors[order.status] || 'bg-gray-100 text-gray-800'} font-bold text-xs px-3 py-1 rounded-lg`}>
              {statusLabels[order.status] || order.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground font-medium">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(order.created_at), 'd MMM yyyy', { locale: nl })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground font-medium">
              <Ruler className="w-4 h-4" />
              <span>{order.width_cm} × {order.height_cm} cm</span>
            </div>
            <div className="flex items-center gap-2 font-black text-foreground">
              <Euro className="w-4 h-4 text-primary" />
              <span>€{Number(order.price).toFixed(2)}</span>
            </div>
          </div>

          {designData.text && (
            <p className="text-sm text-muted-foreground">
              Tekst: <span className="font-medium">"{designData.text}"</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
