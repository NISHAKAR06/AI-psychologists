import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { Heart, Shield, Clock, Users, Video, MessageCircle } from 'lucide-react';

const Landing = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Heart,
      title: 'Expert Care',
      description: 'Connect with qualified healthcare professionals'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encrypted consultations'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access healthcare anytime, anywhere'
    },
    {
      icon: Users,
      title: 'Personalized Care',
      description: 'Tailored treatment plans for your needs'
    },
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'Face-to-face meetings with doctors'
    },
    {
      icon: MessageCircle,
      title: 'Instant Messaging',
      description: 'Chat with healthcare providers in real-time'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              HealSpace
            </h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            <Link to="/auth">
              <Button className="gradient-primary">
                {t('login')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent"
          >
            {t('welcome')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Your trusted platform for digital healthcare consultations. Connect with qualified doctors, 
            manage your health records, and get the care you deserve.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/auth">
              <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                Get Started Today
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why Choose HealSpace?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass-effect hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of patients who trust HealSpace for their healthcare needs.
            </p>
            <Link to="/auth">
              <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">HealSpace</h3>
          </div>
          <p className="text-muted-foreground">
            © 2025 HealSpace. All rights reserved. Your health, our priority.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;