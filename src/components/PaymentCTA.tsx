import { Button } from "@/components/ui/button";

const PaymentCTA = () => {
  // Replace this URL with your Mollie Payment Link
  const molliePaymentLink = "https://paymentlink.mollie.com/payment/YOUR-PAYMENT-LINK-ID/";

  return (
    <div className="flex justify-center py-12">
      <Button 
        size="lg" 
        className="text-lg px-8 py-6"
        onClick={() => window.location.href = molliePaymentLink}
      >
        Offerte aanvragen
      </Button>
    </div>
  );
};

export default PaymentCTA;
