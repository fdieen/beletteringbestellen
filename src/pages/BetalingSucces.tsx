import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BetalingSucces = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Betaling geslaagd
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Bedankt voor je betaling. We nemen zo snel mogelijk contact met je op.
        </p>
        <Button onClick={() => navigate("/")} variant="outline" size="lg">
          Terug naar home
        </Button>
      </div>
    </div>
  );
};

export default BetalingSucces;
