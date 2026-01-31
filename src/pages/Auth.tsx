import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
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
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const { user, signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check for password reset token in URL
  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const type = hashParams.get('type');

    if (type === 'recovery') {
      setIsResetPassword(true);
      setIsLogin(false);
      setIsForgotPassword(false);
    }
  }, [location]);

  useEffect(() => {
    // Don't redirect if user is resetting password
    if (user && !isResetPassword) {
      navigate('/');
    }
  }, [user, navigate, isResetPassword]);

  const validateForm = (emailOnly = false, includeConfirm = false) => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

    if (!isResetPassword) {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        newErrors.email = emailResult.error.errors[0].message;
      }
    }

    if (!emailOnly) {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
    }

    if (includeConfirm && password !== confirmPassword) {
      newErrors.confirmPassword = 'Wachtwoorden komen niet overeen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(false, true)) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Fout',
          description: error.message
        });
      } else {
        toast({
          title: 'Wachtwoord gewijzigd!',
          description: 'Je kunt nu inloggen met je nieuwe wachtwoord.'
        });
        setIsResetPassword(false);
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
        // Clear the hash from URL
        window.history.replaceState(null, '', '/auth');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(true)) return;

    setIsLoading(true);

    try {
      console.log('Sending password reset for:', email);
      const { error } = await resetPassword(email);
      console.log('Reset response error:', error);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Fout',
          description: error.message
        });
      } else {
        toast({
          title: 'E-mail verzonden',
          description: 'Controleer je inbox voor de link om je wachtwoord te resetten.'
        });
        setIsForgotPassword(false);
      }
    } finally {
      setIsLoading(false);
    }
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
                    {isResetPassword ? 'Nieuw wachtwoord' : isForgotPassword ? 'Wachtwoord vergeten' : isLogin ? 'Welkom terug' : 'Account aanmaken'}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {isResetPassword
                      ? 'Kies een nieuw wachtwoord voor je account'
                      : isForgotPassword
                        ? 'Vul je e-mailadres in om een reset link te ontvangen'
                        : isLogin
                          ? 'Log in om je bestellingen te bekijken'
                          : 'Maak een account aan om je bestellingen bij te houden'}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={isResetPassword ? handleUpdatePassword : isForgotPassword ? handleForgotPassword : handleSubmit} className="space-y-5">
                {!isResetPassword && (
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
                )}

                {(!isForgotPassword || isResetPassword) && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="label-small">{isResetPassword ? 'Nieuw wachtwoord' : 'Wachtwoord'}</label>
                      {isLogin && !isResetPassword && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotPassword(true);
                            setErrors({});
                          }}
                          className="text-xs text-primary hover:underline font-medium"
                          disabled={isLoading}
                        >
                          Wachtwoord vergeten?
                        </button>
                      )}
                    </div>
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
                )}

                {isResetPassword && (
                  <div className="space-y-2">
                    <label className="label-small">Bevestig wachtwoord</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-12 h-14 border-2 border-border rounded-2xl text-base font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive font-medium">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

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
                      {isResetPassword ? 'Wachtwoord opslaan' : isForgotPassword ? 'Verstuur reset link' : isLogin ? 'Inloggen' : 'Registreren'}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
              
              {/* Toggle */}
              {!isResetPassword && (
                <div className="text-center pt-4 border-t border-border">
                  {isForgotPassword ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setErrors({});
                      }}
                      className="text-sm text-primary hover:underline font-bold"
                      disabled={isLoading}
                    >
                      Terug naar inloggen
                    </button>
                  ) : (
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
                  )}
                </div>
              )}
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
