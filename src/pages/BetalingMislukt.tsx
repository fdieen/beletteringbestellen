import { Helmet } from "react-helmet-async";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BetalingMislukt = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Betaling geannuleerd of mislukt
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Je betaling is niet gelukt. Probeer het opnieuw of neem contact met ons op.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/")} size="lg">
            Opnieuw proberen
          </Button>
          <Button onClick={() => navigate("/contact")} variant="outline" size="lg">
            Contact opnemen
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default BetalingMislukt;
