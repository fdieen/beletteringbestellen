import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TextDesigner } from '@/components/TextDesigner';
import { LogoUploader } from '@/components/LogoUploader';
import { InstructionVideo } from '@/components/InstructionVideo';
import { PriceComparison } from '@/components/PriceComparison';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TextDesigner />
        <LogoUploader />
        <InstructionVideo />
        <PriceComparison />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
