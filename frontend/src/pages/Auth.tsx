import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ArrowLeft, User, UserCog } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const { t } = useTranslation();
  const { login, register, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'user' as UserRole
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    role: 'user' as UserRole
  });

  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showRoleSelection) {
      setShowRoleSelection(true);
      return;
    }

    const success = await login(loginData.email, loginData.password, loginData.role);
    if (success) {
      toast({
        title: "Login Successful",
        description: `Welcome back! Redirecting to ${loginData.role} dashboard...`,
      });
      navigate(loginData.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please check and try again.",
        variant: "destructive"
      });
      return;
    }

    const success = await register(registerData);
    if (success) {
      toast({
        title: "Registration Successful",
        description: `Account created! Redirecting to ${registerData.role} dashboard...`,
      });
      navigate(registerData.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast({
        title: "Registration Failed", 
        description: "Please check your information and try again.",
        variant: "destructive"
      });
    }
  };

  const resetToCredentials = () => {
    setShowRoleSelection(false);
    setLoginData(prev => ({ ...prev, role: 'user' }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5" />
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold">HealSpace</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="glass-effect">
            <CardHeader className="text-center">
              <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {t('welcome')}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {!showRoleSelection ? (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">{t('login')}</TabsTrigger>
                    <TabsTrigger value="register">{t('register')}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">{t('email')}</Label>
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">{t('password')}</Label>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full gradient-primary" 
                        disabled={isLoading}
                      >
                        {isLoading ? t('loading') : t('continue')}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">{t('fullName')}</Label>
                        <Input
                          id="register-name"
                          value={registerData.fullName}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email">{t('email')}</Label>
                        <Input
                          id="register-email"
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-phone">{t('phone')}</Label>
                        <Input
                          id="register-phone"
                          type="tel"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">{t('password')}</Label>
                        <Input
                          id="register-password"
                          type="password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-confirm">{t('confirmPassword')}</Label>
                        <Input
                          id="register-confirm"
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>{t('selectRole')}</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            type="button"
                            variant={registerData.role === 'user' ? 'default' : 'outline'}
                            onClick={() => setRegisterData(prev => ({ ...prev, role: 'user' }))}
                            className="flex flex-col items-center p-6 h-auto"
                          >
                            <User className="h-8 w-8 mb-2" />
                            {t('user')}
                          </Button>
                          <Button
                            type="button"
                            variant={registerData.role === 'admin' ? 'default' : 'outline'}
                            onClick={() => setRegisterData(prev => ({ ...prev, role: 'admin' }))}
                            className="flex flex-col items-center p-6 h-auto"
                          >
                            <UserCog className="h-8 w-8 mb-2" />
                            {t('admin')}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full gradient-primary" 
                        disabled={isLoading}
                      >
                        {isLoading ? t('loading') : t('register')}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">{t('selectRole')}</h3>
                    <p className="text-muted-foreground text-sm">Choose how you want to access HealSpace</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Button
                      variant={loginData.role === 'user' ? 'default' : 'outline'}
                      onClick={() => setLoginData(prev => ({ ...prev, role: 'user' }))}
                      className="flex items-center justify-center p-6 h-auto space-x-3"
                    >
                      <User className="h-8 w-8" />
                      <div className="text-left">
                        <div className="font-semibold">{t('user')}</div>
                        <div className="text-sm opacity-80">Access patient dashboard</div>
                      </div>
                    </Button>

                    <Button
                      variant={loginData.role === 'admin' ? 'default' : 'outline'}
                      onClick={() => setLoginData(prev => ({ ...prev, role: 'admin' }))}
                      className="flex items-center justify-center p-6 h-auto space-x-3"
                    >
                      <UserCog className="h-8 w-8" />
                      <div className="text-left">
                        <div className="font-semibold">{t('admin')}</div>
                        <div className="text-sm opacity-80">Manage platform</div>
                      </div>
                    </Button>
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={resetToCredentials}
                      className="flex-1"
                    >
                      {t('cancel')}
                    </Button>
                    <Button 
                      onClick={handleLogin}
                      className="flex-1 gradient-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? t('loading') : t('continue')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
