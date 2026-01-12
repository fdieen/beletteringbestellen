import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Bericht verzonden!",
        description: "We nemen zo snel mogelijk contact met je op.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 md:py-24">
        <div className="section-container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Contact
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Heb je een vraag? Neem gerust contact met ons op!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Neem contact op
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">E-mail</p>
                      <a href="mailto:info@bestellen.nl" className="text-muted-foreground hover:text-primary transition-colors">
                        info@bestellen.nl
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Telefoon</p>
                      <a href="tel:+31201234567" className="text-muted-foreground hover:text-primary transition-colors">
                        020 - 123 4567
                      </a>
                      <p className="text-sm text-muted-foreground">Ma-Vr: 9:00 - 17:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Adres</p>
                      <p className="text-muted-foreground">
                        Voorbeeldstraat 123<br />
                        1234 AB Amsterdam
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted/50 rounded-xl">
                <h3 className="font-semibold text-foreground mb-2">Snelle reactie</h3>
                <p className="text-muted-foreground text-sm">
                  We reageren meestal binnen 24 uur op werkdagen. Voor dringende vragen kun je ons het beste bellen.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-elevated">
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                Stuur een bericht
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Bedankt!</h3>
                  <p className="text-muted-foreground">
                    Je bericht is verzonden. We nemen zo snel mogelijk contact op.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-primary hover:underline"
                  >
                    Nog een bericht sturen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Naam *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-styled"
                      placeholder="Je naam"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-styled"
                      placeholder="je@email.nl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-styled"
                      placeholder="Waar gaat je vraag over?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bericht *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-styled resize-none"
                      placeholder="Typ hier je bericht..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>Versturen...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Versturen
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
