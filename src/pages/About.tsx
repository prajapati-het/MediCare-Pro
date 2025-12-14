import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Heart, Award, Users, Building2, Clock, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { icon: Building2, value: "50+", label: "Partner Hospitals" },
    { icon: Users, value: "500+", label: "Expert Doctors" },
    { icon: Heart, value: "100K+", label: "Patients Served" },
    { icon: Award, value: "15+", label: "Years Experience" },
  ];

  const values = [
    { icon: Heart, title: "Patient-First Care", description: "Every decision we make prioritizes patient health and well-being." },
    { icon: Shield, title: "Trust & Security", description: "Your health data is protected with enterprise-grade security." },
    { icon: Clock, title: "24/7 Availability", description: "Round-the-clock support for all your healthcare needs." },
    { icon: Award, title: "Excellence", description: "We partner only with accredited and top-rated healthcare facilities." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Transforming <span className="gradient-text">Healthcare</span> Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to make healthcare accessible, efficient, and patient-centered through innovative technology solutions.
            </p>
          </motion.div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover-lift">
                  <CardContent className="p-6">
                    <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center text-foreground mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
