import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Stethoscope, 
  Users, 
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Bed,
  FileText,
  Shield,
  HelpCircle,
  Building,
  User,
  AlertCircle,
  ClipboardList
} from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles?: UserRole[];
}

const adminMenuItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Stethoscope, label: 'Doctors', path: '/admin/doctors', roles: ['admin'] },
  { icon: Users, label: 'Staff', path: '/admin/staff', roles: ['admin'] },
  { icon: Bed, label: 'Facilities', path: '/admin/facilities', roles: ['admin'] },
  { icon: AlertCircle, label: 'Problems', path: '/admin/problems', roles: ['admin'] },
];

const doctorMenuItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'Appointments', path: '/doctor/appointments', roles: ['doctor'] },
  { icon: ClipboardList, label: 'Pending Appointments', path: '/doctor/pending-appointments', roles: ['doctor'] },
  { icon: Users, label: 'My Patients', path: '/doctor/patients', roles: ['doctor'] },
  { icon: User, label: 'My Profile', path: '/doctor/profile', roles: ['doctor'] },
];

const analyticsItems: SidebarItem[] = [
  { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: ['admin'] },
  { icon: FileText, label: 'Reports', path: '/reports', roles: ['admin'] },
];

const systemItems: SidebarItem[] = [
  { icon: Settings, label: 'Settings', path: '/admin/settings', roles: ['admin'] },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export function DashboardSidebar() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filterByRole = (items: SidebarItem[]) => {
    return items.filter(item => {
      if (!item.roles) return true;
      if (!user) return false;
      return item.roles.includes(user.role);
    });
  };

  const getMenuItems = () => {
    if (user?.role === 'doctor') {
      return doctorMenuItems;
    }
    return adminMenuItems;
  };

  const mainMenuItems = getMenuItems();

  return (
    <motion.aside
      className={cn(
        "hidden lg:flex flex-col h-[calc(100vh-4.5rem)] sticky top-[4.5rem] left-0 border-r border-border bg-card transition-all duration-300 flex-shrink-0",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 p-1.5 rounded-full bg-card border border-border shadow-md hover:bg-muted transition-colors z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <div className="flex-1 py-6 px-3 overflow-y-auto">
        
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main Menu
            </p>
          )}
          {filterByRole(mainMenuItems).map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SidebarLink
                item={item}
                isActive={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
                isCollapsed={isCollapsed}
              />
            </motion.div>
          ))}
        </div>

        {user?.role === 'admin' && (
          <div className="mt-8 space-y-1">
            {!isCollapsed && (
              <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Analytics
              </p>
            )}
            {filterByRole(analyticsItems).map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <SidebarLink
                  item={item}
                  isActive={location.pathname === item.path}
                  isCollapsed={isCollapsed}
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-1">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              System
            </p>
          )}
          {filterByRole(systemItems).map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <SidebarLink
                item={item}
                isActive={location.pathname === item.path}
                isCollapsed={isCollapsed}
              />
            </motion.div>
          ))}
        </div>

        {user && (
          <motion.div 
            className={cn(
              "mb-6 p-3 rounded-xl bg-primary/5 border border-primary/10",
              isCollapsed && "p-2"
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {!isCollapsed ? (
              <>
                <p className="text-xs text-muted-foreground mb-1">Logged in as</p>
                <p className="font-semibold text-foreground text-sm">{user.username}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.hospital}</p>
                <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                  <Shield className="w-3 h-3" />
                  {user.role === 'admin' ? 'Hospital Admin' : 'Doctor'}
                </span>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {user.username.charAt(0)}
                </div>
              </div>
            )}
          </motion.div>
        )}

      </div>

      {user && !isCollapsed && (
        <motion.div 
          className="p-4 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-muted-foreground mb-2">Current Hospital</p>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium truncate">{user.hospital}</span>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}

function SidebarLink({ 
  item, 
  isActive, 
  isCollapsed 
}: { 
  item: SidebarItem; 
  isActive: boolean; 
  isCollapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        isCollapsed && "justify-center px-2"
      )}
      title={isCollapsed ? item.label : undefined}
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary-foreground")} />
      {!isCollapsed && <span>{item.label}</span>}
    </Link>
  );
}
