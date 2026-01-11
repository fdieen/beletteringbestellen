import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TextDesigner } from '@/components/TextDesigner';
import { HowItWorks } from '@/components/HowItWorks';
import { UseCases } from '@/components/UseCases';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TextDesigner />
        <HowItWorks />
        <UseCases />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
