import { Helmet } from "react-helmet-async";

const Bedankt = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Bedankt voor je aanvraag of betaling.
        </h1>
        <p className="text-lg text-muted-foreground">
          We nemen zo snel mogelijk contact met je op.
        </p>
      </div>
    </div>
    </>
  );
};

export default Bedankt;
