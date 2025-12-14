import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  BarChart3, 
  Users, 
  Clock,
  CheckCircle2,
  Sparkles,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { IntroLoader } from '@/components/IntroLoader';
import { HospitalSlideshow } from '@/components/HospitalSlideshow';
import { DashboardPreview } from '@/components/DashboardPreview';
import { useAuth } from '@/contexts/AuthContext';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";

const features = [
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Secure multi-level access control for admins and doctors.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Comprehensive dashboards with live data visualization and performance metrics.',
  },
  {
    icon: Users,
    title: 'Staff Management',
    description: 'Complete doctor, nurse, and staff management with availability tracking.',
  },
  {
    icon: Clock,
    title: 'Appointment System',
    description: 'Efficient scheduling with automated reminders and conflict detection.',
  },
];

export default function Index() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );
  const navigate = useNavigate();
  

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('intro_seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro_seen', 'true');
    setShowIntro(false);
    setIntroComplete(true);
  };

  const handleNavigateWithAuth = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  if (showIntro) {
    return <IntroLoader onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Next-Generation Healthcare Management
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Streamline Your{' '}
                <span className="gradient-text">Hospital Operations</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Comprehensive hospital and doctor management system with powerful analytics, 
                role-based access control, and seamless multi-branch coordination.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="gap-2"
                    onClick={handleNavigateWithAuth}
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointments
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="xl"
                    onClick={handleNavigateWithAuth}
                  >
                    View Dashboard
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-8 mt-12"
                initial={{ opacity: 0 }}
                animate={introComplete ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {[
                  { value: '8+', label: 'Hospitals' },
                  { value: '250+', label: 'Doctors' },
                  { value: '50K+', label: 'Patients' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((stat) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Hospital Network
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our network of state-of-the-art healthcare facilities across the region.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <HospitalSlideshow />
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Powerful Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage hospitals, doctors, and healthcare operations efficiently.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass-card rounded-2xl p-6 hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.div 
                    className="p-3 rounded-xl bg-primary/10 w-fit mb-4"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Dashboard Preview
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get a glimpse of the powerful analytics and management tools at your fingertips.
              </p>
            </motion.div>

            <DashboardPreview />
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              className="relative overflow-hidden rounded-3xl p-8 md:p-12 lg:p-16"
              style={{ background: 'var(--gradient-hero)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Transform Your Hospital Management?
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  Join hundreds of healthcare facilities already using MediCare Pro to streamline their operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="glass" 
                      size="lg" 
                      className="gap-2"
                      onClick={handleNavigateWithAuth}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="hero-outline" size="lg">
                      Schedule Demo
                    </Button>
                  </motion.div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-8">
                  {['No credit card required', 'Free 14-day trial', '24/7 Support'].map((item) => (
                    <motion.div 
                      key={item} 
                      className="flex items-center gap-2 text-primary-foreground/80 text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <div className="absolute top-10 right-10 w-40 h-40 bg-primary-foreground rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-40 w-60 h-60 bg-primary-foreground rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="py-12 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 MediCare Pro. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
