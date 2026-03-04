import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
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
  Building2,
  User,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useGetAdminDetailsQuery,
  useGetDoctorDetailsQuery,
} from "@/redux/slices/api";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles?: string[];
}

const adminMenuItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Stethoscope, label: "Doctors", path: "/doctors", roles: ["admin"] },
  { icon: Users, label: "Staff", path: "/admin/staff", roles: ["admin"] },
  { icon: Bed, label: "Facilities", path: "/admin/facilities", roles: ["admin"] },
  { icon: AlertCircle, label: "Problems", path: "/admin/problems", roles: ["admin"] },
];

const doctorMenuItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/doctor/appointments", roles: ["doctor"] },
  { icon: Users, label: "My Patients", path: "/doctor/patients", roles: ["doctor"] },
  { icon: User, label: "My Profile", path: "/doctor/profile", roles: ["doctor"] },
];

const analyticsItems: SidebarItem[] = [
  { icon: BarChart3, label: "Analytics", path: "/analytics", roles: ["admin"] },
  { icon: FileText, label: "Reports", path: "/reports", roles: ["admin"] },
];

const systemItems: SidebarItem[] = [
  { icon: Settings, label: "Settings", path: "/admin/settings", roles: ["admin"] },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

export function DashboardSidebar() {
  const { doctorUser, adminUser } = useSelector((state: RootState) => state.app);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  let user = doctorUser ?? adminUser;

  const isDoctor = user?.role === "doctor";
  const isAdmin = user?.role === "admin";

  const { data: doctor } = useGetDoctorDetailsQuery(
    isDoctor ? String(user?.id) : "",
    { skip: !isDoctor }
  );

  const { data: admin } = useGetAdminDetailsQuery(
    isAdmin ? String(user?.id) : "",
    { skip: !isAdmin }
  );

  user = doctor ?? admin ?? user;

  const filterByRole = (items: SidebarItem[]) =>
    items.filter((item) => {
      if (!item.roles) return true;
      if (!user) return false;
      return item.roles.includes(user.role);
    });

  const mainMenuItems =
    user?.role === "doctor" ? doctorMenuItems : adminMenuItems;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 256, // px values
      }}
      transition={{
        duration: 0.28,
        ease: [0.4, 0, 0.2, 1], // smooth cubic-bezier
      }}
      className="hidden lg:flex flex-col h-[calc(100vh-4.5rem)] sticky top-[4.5rem] border-r border-border bg-card flex-shrink-0 overflow-hidden"
      style={{ willChange: "width" }}
    >
      {/* Collapse Button */}
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

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
        {/* Main Menu */}
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
              isActive={
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/")
              }
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Analytics */}
        {user?.role === "admin" && (
          <div className="space-y-1">
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
        )}

        {/* System */}
        <div className="space-y-1">
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

      {/* Bottom Section */}
      {user && (
        <motion.div
          className="mt-auto border-t border-border p-4 space-y-4 bg-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* User Card */}
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border shadow-sm",
              isCollapsed && "justify-center p-2"
            )}
          >
            {!isCollapsed ? (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Logged in as
                  </p>
                  <p className="font-semibold text-sm truncate">
                    {user.username}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-primary font-medium">
                    <Shield className="w-3 h-3" />
                    {user.role === "admin"
                      ? "Hospital Admin"
                      : "Doctor"}
                  </span>
                </div>
              </>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Hospital */}
          {!isCollapsed && (
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <p className="text-xs text-muted-foreground mb-1">
                Current Hospital
              </p>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium truncate">
                  {user.hospital}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.aside>
  );
}

function SidebarLink({
  item,
  isActive,
  isCollapsed,
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
          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        isCollapsed && "justify-center px-2"
      )}
      title={isCollapsed ? item.label : undefined}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <motion.span
        initial={false}
        animate={{
          opacity: isCollapsed ? 0 : 1,
          width: isCollapsed ? 0 : "auto",
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden whitespace-nowrap"
      >
        {item.label}
      </motion.span>
    </Link>
  );
}