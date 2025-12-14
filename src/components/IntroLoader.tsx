import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Activity, Stethoscope, Building2 } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 2000),
      setTimeout(() => onComplete(), 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1.2, 1],
                opacity: [0, 0.3, 0.2, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
        
          <motion.div
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: stage >= 1 ? [1, 1.2, 1] : 1,
                rotate: stage >= 1 ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 rounded-2xl bg-primary/20 backdrop-blur-sm">
                <Heart className="w-10 h-10 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                scale: stage >= 2 ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <Activity className="w-10 h-10 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                scale: stage >= 2 ? [1, 1.2, 1] : 1,
                rotate: stage >= 2 ? -15 : 0,
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
                <Stethoscope className="w-10 h-10 text-primary-foreground" />
              </div>
            </motion.div>
          </motion.div>

          
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="p-3 rounded-2xl bg-primary shadow-glow"
              animate={{ rotate: stage >= 3 ? 360 : 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <Building2 className="w-12 h-12 text-primary-foreground" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            MediCare Pro
          </motion.h1>

          <motion.p
            className="text-primary-foreground/70 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Hospital Management System
          </motion.p>

          <motion.div
            className="mt-10 w-64 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
