import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Bed } from 'lucide-react';

interface Hospital {
  id: number;
  name: string;
  location: string;
  description: string;
  beds: number;
  staff: number;
  image: string;
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: 'City General Hospital',
    location: 'Downtown District',
    description: 'Our flagship facility offering comprehensive healthcare services with state-of-the-art technology.',
    beds: 450,
    staff: 1200,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Metro Health Center',
    location: 'Westside Avenue',
    description: 'Specialized in cardiac care and emergency services with 24/7 trauma center.',
    beds: 320,
    staff: 850,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Sunrise Medical Complex',
    location: 'Eastside Boulevard',
    description: 'Family-focused healthcare with pediatric and maternity excellence.',
    beds: 280,
    staff: 720,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&h=600&fit=crop',
  },
  {
    id: 4,
    name: 'Valley Regional Hospital',
    location: 'Northern Hills',
    description: 'Community hospital providing accessible care to suburban regions.',
    beds: 200,
    staff: 540,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&h=600&fit=crop',
  },
];

export function HospitalSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hospitals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentHospital = hospitals[currentIndex];

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHospital.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={currentHospital.image}
            alt={currentHospital.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
    
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h3
              className="text-2xl md:text-4xl font-bold text-primary-foreground mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentHospital.name}
            </motion.h3>
            
            <motion.div
              className="flex items-center gap-2 text-primary-foreground/80 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <MapPin className="w-4 h-4" />
              <span>{currentHospital.location}</span>
            </motion.div>
            
            <motion.p
              className="text-primary-foreground/70 text-sm md:text-base max-w-xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {currentHospital.description}
            </motion.p>
            
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Bed className="w-5 h-5" />
                <span className="font-semibold">{currentHospital.beds}</span>
                <span className="text-sm">Beds</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{currentHospital.staff}</span>
                <span className="text-sm">Staff</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 md:right-10 flex gap-2">
        {hospitals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'bg-primary-foreground/50 hover:bg-primary-foreground/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
