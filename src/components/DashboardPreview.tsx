import { motion } from 'framer-motion';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  Building2, 
  TrendingUp,
  Activity,
  Heart,
  Clock
} from 'lucide-react';

const stats = [
  { icon: Users, label: 'Total Patients', value: '12,847', change: '+12%', color: 'primary' },
  { icon: Stethoscope, label: 'Active Doctors', value: '248', change: '+5%', color: 'secondary' },
  { icon: Calendar, label: "Today's Appointments", value: '156', change: '+18%', color: 'accent' },
  { icon: Building2, label: 'Hospital Branches', value: '8', change: '+1', color: 'info' },
];

const recentActivities = [
  { type: 'appointment', message: 'New appointment scheduled with Dr. Smith', time: '2 min ago' },
  { type: 'admission', message: 'Patient admitted to ICU Ward', time: '15 min ago' },
  { type: 'discharge', message: 'Patient discharged from General Ward', time: '32 min ago' },
  { type: 'surgery', message: 'Surgery completed successfully', time: '1 hour ago' },
];

export function DashboardPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="glass-card rounded-xl p-5 hover-lift cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h4>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Weekly Overview</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4 text-primary" />
              <span>Live Data</span>
            </div>
          </div>

          <div className="h-48 flex items-end justify-between gap-2">
            {[65, 45, 80, 55, 90, 70, 85].map((height, index) => (
              <motion.div
                key={index}
                className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </motion.div>


        <motion.div
          variants={itemVariants}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <Heart className="w-5 h-5 text-destructive animate-pulse" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
