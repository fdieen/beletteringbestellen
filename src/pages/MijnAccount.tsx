import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Package, Calendar, Ruler, Euro, User } from 'lucide-react';
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
      // Cast the design_data from Json to DesignData
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
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 section-container py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Mijn Account</h1>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Uitloggen
          </Button>
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Mijn Bestellingen
            </CardTitle>
            <CardDescription>
              Bekijk hier al je bestellingen en hun status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nog geen bestellingen</h3>
                <p className="text-muted-foreground mb-4">
                  Je hebt nog geen bestellingen geplaatst.
                </p>
                <Button onClick={() => navigate('/')}>
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
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const designData = order.design_data || {};
  
  return (
    <div className="border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Preview */}
        <div 
          className="w-full md:w-48 h-24 rounded-lg flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#f0f0f0' }}
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
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{order.product_name}</h3>
            <Badge className={statusColors[order.status] || 'bg-gray-100 text-gray-800'}>
              {statusLabels[order.status] || order.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(order.created_at), 'd MMM yyyy', { locale: nl })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ruler className="w-4 h-4" />
              <span>{order.width_cm} × {order.height_cm} cm</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-primary">
              <Euro className="w-4 h-4" />
              <span>€{Number(order.price).toFixed(2)}</span>
            </div>
          </div>
          
          {designData.text && (
            <p className="text-sm text-muted-foreground">
              Tekst: "{designData.text}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
