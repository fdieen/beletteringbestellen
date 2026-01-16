import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, User as UserIcon, ShieldCheck, ArrowRight } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Voer een geldig e-mailadres in');
const passwordSchema = z.string().min(6, 'Wachtwoord moet minimaal 6 tekens bevatten');

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              variant: 'destructive',
              title: 'Inloggen mislukt',
              description: 'E-mailadres of wachtwoord is onjuist.'
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Fout',
              description: error.message
            });
          }
        } else {
          toast({
            title: 'Welkom terug!',
            description: 'Je bent succesvol ingelogd.'
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              variant: 'destructive',
              title: 'Account bestaat al',
              description: 'Dit e-mailadres is al geregistreerd. Probeer in te loggen.'
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Fout',
              description: error.message
            });
          }
        } else {
          toast({
            title: 'Account aangemaakt!',
            description: 'Je bent succesvol geregistreerd en ingelogd.'
          });
          navigate('/');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 selection:bg-primary/10 selection:text-primary">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 md:py-20 px-4">
        <div className="w-full max-w-md">
          {/* Card Premium Style */}
          <div className="card-premium">
            {/* Decorative blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center shadow-lg">
                  <UserIcon className="w-8 h-8 text-background" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-foreground tracking-tight">
                    {isLogin ? 'Welkom terug' : 'Account aanmaken'}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {isLogin 
                      ? 'Log in om je bestellingen te bekijken' 
                      : 'Maak een account aan om je bestellingen bij te houden'}
                  </p>
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="label-small">E-mailadres</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jouw@email.nl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 border-2 border-border rounded-2xl text-base font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive font-medium">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="label-small">Wachtwoord</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 border-2 border-border rounded-2xl text-base font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive font-medium">{errors.password}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] group" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Even geduld...
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Inloggen' : 'Registreren'}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
              
              {/* Toggle */}
              <div className="text-center pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                  className="text-sm text-primary hover:underline font-bold"
                  disabled={isLoading}
                >
                  {isLogin 
                    ? 'Nog geen account? Registreer hier' 
                    : 'Al een account? Log hier in'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Veilig & Beveiligd</span>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
