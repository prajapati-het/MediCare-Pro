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
  Building
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles?: ('super_admin' | 'admin')[];
}

const mainMenuItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Building2, label: 'Hospitals', path: '/hospitals', roles: ['super_admin'] },
  { icon: Building, label: 'My Hospital', path: '/my-hospital', roles: ['admin'] },
  { icon: Stethoscope, label: 'Doctors', path: '/doctors' },
  { icon: Users, label: 'Staff', path: '/staff' },
  { icon: Calendar, label: 'Appointments', path: '/appointments' },
  { icon: Bed, label: 'Facilities', path: '/facilities' },
];

const analyticsItems: SidebarItem[] = [
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: FileText, label: 'Reports', path: '/reports' },
];

const systemItems: SidebarItem[] = [
  { icon: Shield, label: 'Permissions', path: '/permissions', roles: ['super_admin', 'admin'] },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export function DashboardSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filterByRole = (items: SidebarItem[]) => {
    return items.filter(item => {
      if (!item.roles) return true;
      if (!user) return false;
      return item.roles.includes(user.role as 'super_admin' | 'admin');
    });
  };

  return (
    <motion.aside
      className={cn(
        "hidden lg:flex flex-col h-[calc(100vh-4.5rem)] sticky top-[4.5rem] border-r border-border bg-card transition-all duration-300",
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
        {user && (
          <div className={cn(
            "mb-6 p-3 rounded-xl bg-primary/5 border border-primary/10",
            isCollapsed && "p-2"
          )}>
            {!isCollapsed ? (
              <>
                <p className="text-xs text-muted-foreground mb-1">Logged in as</p>
                <p className="font-semibold text-foreground text-sm">{user.name}</p>
                <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Shield className="w-3 h-3" />
                  {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </span>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {user.name.charAt(0)}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main Menu
            </p>
          )}
          {filterByRole(mainMenuItems).map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        <div className="mt-8 space-y-1">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Analytics
            </p>
          )}
          {filterByRole(analyticsItems).map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        <div className="mt-8 space-y-1">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              System
            </p>
          )}
          {filterByRole(systemItems).map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>

      {user?.role === 'super_admin' && !isCollapsed && (
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Currently viewing</p>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">All Hospitals</span>
          </div>
        </div>
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
