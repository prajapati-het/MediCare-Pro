import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  User,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === '/';

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors ${
        isLanding 
          ? 'bg-background/80 border-border/50' 
          : 'bg-card/95 border-border'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md group-hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-foreground">MediCare Pro</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Hospital Management</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/hospitals" active={location.pathname.startsWith('/hospitals')}>Hospitals</NavLink>
                <NavLink to="/doctors" active={location.pathname.startsWith('/doctors')}>Doctors</NavLink>
                <NavLink to="/staff" active={location.pathname.startsWith('/staff')}>Staff</NavLink>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                <motion.button
                  className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Search className="w-4 h-4" />
                  <span>Search...</span>
                  <kbd className="ml-4 px-1.5 py-0.5 text-xs bg-background rounded border">⌘K</kbd>
                </motion.button>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Button>
              </>
            )}

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden lg:block text-sm font-medium">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden py-4 border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-2">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileNavLink>
              {isAuthenticated && (
                <>
                  <MobileNavLink to="/hospitals" onClick={() => setIsMobileMenuOpen(false)}>Hospitals</MobileNavLink>
                  <MobileNavLink to="/doctors" onClick={() => setIsMobileMenuOpen(false)}>Doctors</MobileNavLink>
                  <MobileNavLink to="/staff" onClick={() => setIsMobileMenuOpen(false)}>Staff</MobileNavLink>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
    >
      {children}
    </Link>
  );
}
