import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MOLLIE_PAYMENT_LINK } from "@/config/payment";

interface PaymentButtonProps {
  className?: string;
}

const PaymentButton = ({ className }: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    // Small delay to show loading state before redirect
    setTimeout(() => {
      window.location.href = MOLLIE_PAYMENT_LINK;
    }, 300);
  };

  return (
    <Button
      size="lg"
      className={`text-lg px-8 py-6 ${className || ""}`}
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Laden...
        </>
      ) : (
        "Betaal nu"
      )}
    </Button>
  );
};

export default PaymentButton;
