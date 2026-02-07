import { useEffect, useState } from "react";
import { CheckCircle, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PendingOrder {
  orderId: string;
  orderNumber: string;
  email: string;
  items: Array<{
    text: string;
    font: string;
    color: string;
    height: number;
    quantity: number;
    price: number;
  }>;
}

const BetalingSucces = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<PendingOrder | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Get order data from localStorage
    const pendingOrderStr = localStorage.getItem('pendingOrder');
    if (pendingOrderStr) {
      const pendingOrder: PendingOrder = JSON.parse(pendingOrderStr);
      setOrderData(pendingOrder);

      // Send confirmation email
      sendConfirmationEmail(pendingOrder);

      // Clear localStorage after retrieving
      localStorage.removeItem('pendingOrder');
    }
  }, []);

  const sendConfirmationEmail = async (order: PendingOrder) => {
    try {
      const { error } = await supabase.functions.invoke('send-order-email', {
        body: {
          to: order.email,
          orderNumber: order.orderNumber,
          customerName: order.email.split('@')[0], // Fallback name
          items: order.items,
          subtotal: order.items.reduce((sum, item) => sum + item.price, 0),
          shipping: 4.95,
          total: order.items.reduce((sum, item) => sum + item.price, 0) + 4.95,
        },
      });

      if (!error) {
        setEmailSent(true);
      }
    } catch (err) {
      console.error('Error sending email:', err);
    }
  };

  const orderNumber = searchParams.get('order') || orderData?.orderNumber;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Bedankt voor je bestelling!
        </h1>

        {orderNumber && (
          <div className="bg-muted rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Bestelnummer</p>
            <p className="text-xl font-bold text-primary">{orderNumber}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-left bg-muted/50 rounded-lg p-4">
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Bevestiging verstuurd</p>
              <p className="text-sm text-muted-foreground">
                {orderData?.email ? `Naar ${orderData.email}` : 'Je ontvangt een e-mail met je bestelgegevens'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left bg-muted/50 rounded-lg p-4">
            <Package className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Snelle verzending</p>
              <p className="text-sm text-muted-foreground">
                Je bestelling wordt zo snel mogelijk verwerkt en verzonden
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate("/")} className="w-full" size="lg">
            Terug naar home
          </Button>
          <Button onClick={() => navigate("/mijn-account")} variant="outline" className="w-full" size="lg">
            Bekijk mijn bestellingen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BetalingSucces;
