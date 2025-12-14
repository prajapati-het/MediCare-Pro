import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Bell,
  ChevronDown,
  Calendar,
  Info,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout as logoutAction } from "@/redux/slices/appSlice";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLanding = location.pathname === "/";

  const handleBookAppointments = () => {
    navigate(isLoggedIn ? "/dashboard" : "/auth");
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors ${
        isLanding
          ? "bg-background/80 border-border/50"
          : "bg-card/95 border-border"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                MediCare Pro
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Hospital Management
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <motion.button
              onClick={handleBookAppointments}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-4 h-4" />
              Book Appointments
            </motion.button>

            <NavLink to="/about" active={location.pathname === "/about"}>
              <Info className="w-4 h-4" />
              About
            </NavLink>

            <NavLink to="/contact" active={location.pathname === "/contact"}>
              <Phone className="w-4 h-4" />
              Contact
            </NavLink>

            {isLoggedIn && user ? (
              <>
                <Button variant="ghost" size="icon" className="relative ml-2">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 ml-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        {user.username.charAt(0)}
                      </div>
                      <span className="hidden lg:block text-sm font-medium">
                        {user.username}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                      <span className="inline-flex mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs capitalize">
                        {user.role}
                      </span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="gap-2 ml-4">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </nav>


          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden py-4 border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div className="flex flex-col gap-2">
              <MobileNavLink
                onClick={() => {
                  handleBookAppointments();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointments
              </MobileNavLink>

              <MobileNavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </MobileNavLink>

              <MobileNavLink
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </MobileNavLink>

              {isLoggedIn ? (
                <>
                  <MobileNavLink
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </MobileNavLink>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg text-destructive font-medium hover:bg-muted text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <MobileNavLink
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </MobileNavLink>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}


function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  to,
  onClick,
  children,
}: {
  to?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="px-4 py-3 rounded-lg text-foreground font-medium hover:bg-muted flex items-center"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-foreground font-medium hover:bg-muted flex items-center w-full text-left"
    >
      {children}
    </button>
  );
}
