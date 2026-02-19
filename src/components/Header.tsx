import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
  const { scrollY } = useScroll();

  const { doctorUser, isLoggedIn } = useSelector(
    (state: RootState) => state.app
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors ${
        isLanding
          ? "bg-background/80 border-border/50"
          : "bg-card/95 border-border"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.6 
      }}
      style={{
        opacity: headerOpacity,
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{
          background: scrolled 
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            backgroundImage: [
              'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <motion.div
              className="relative"
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary blur-lg opacity-0 group-hover:opacity-75"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.75, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Logo container */}
              <motion.div
                className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-2xl"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                }}
                transition={{ 
                  rotate: { duration: 0.5 },
                  scale: { type: "spring", stiffness: 400 }
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                
                {/* Sparkle effect */}
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h1 
                className="text-lg font-bold text-foreground gradient-text"
                whileHover={{ scale: 1.05 }}
              >
                MediCare Pro
              </motion.h1>
              <motion.p 
                className="text-xs text-muted-foreground hidden sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Hospital Management
              </motion.p>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={handleBookAppointments}
              className="relative px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-muted/50 rounded-xl"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <span className="relative flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Calendar className="w-4 h-4" />
                </motion.div>
                Book Appointments
              </span>
            </motion.button>

            <NavLink to="/about" active={location.pathname === "/about"} delay={0.2}>
              <Info className="w-4 h-4" />
              About
            </NavLink>

            <NavLink to="/contact" active={location.pathname === "/contact"} delay={0.3}>
              <Phone className="w-4 h-4" />
              Contact
            </NavLink>

            {isLoggedIn && doctorUser ? (
              <>
                {/* Notification Bell */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: [0, -15, 15, -15, 0] }}
                  className="relative ml-2"
                >
                  <Button variant="ghost" size="icon" className="relative">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: 3 
                      }}
                    >
                      <Bell className="w-5 h-5" />
                    </motion.div>
                    
                    <motion.span
                      className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity 
                      }}
                    />
                  </Button>
                </motion.div>

                {/* User Dropdown */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 ml-2"
                        >
                          {/* Avatar with 3D effect */}
                          <motion.div
                            className="relative w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-lg"
                            whileHover={{ 
                              rotateY: 360,
                              scale: 1.1,
                            }}
                            transition={{ 
                              rotateY: { duration: 0.6 },
                              scale: { type: "spring", stiffness: 400 }
                            }}
                            style={{ perspective: 1000 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 blur-md"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                            <span className="relative z-10">
                              {doctorUser.username.charAt(0)}
                            </span>
                          </motion.div>

                          <span className="hidden lg:block text-sm font-medium">
                            {doctorUser.username}
                          </span>
                          
                          <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <p className="font-medium">{doctorUser.username}</p>
                          <p className="text-xs text-muted-foreground">{doctorUser.email}</p>
                          <motion.span
                            className="inline-flex mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs capitalize"
                            whileHover={{ scale: 1.05 }}
                          >
                            {doctorUser.role}
                          </motion.span>
                        </motion.div>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <motion.div whileHover={{ x: 4 }}>
                        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </DropdownMenuItem>
                      </motion.div>

                      <DropdownMenuSeparator />

                      <motion.div whileHover={{ x: 4 }}>
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="text-destructive"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </DropdownMenuItem>
                      </motion.div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth">
                  <Button 
                    size="sm" 
                    className="gap-2 ml-4 relative overflow-hidden group"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    
                    <motion.div
                      animate={{ rotate: [0,0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <LogIn className="w-4 h-4 relative z-10" />
                    </motion.div>
                    <span className="relative z-10">Login</span>
                  </Button>
                </Link>
              </motion.div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative overflow-hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-col gap-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                <MobileNavLink
                  onClick={() => {
                    handleBookAppointments();
                    setIsMobileMenuOpen(false);
                  }}
                  index={0}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointments
                </MobileNavLink>

                <MobileNavLink
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  index={1}
                >
                  <Info className="w-4 h-4 mr-2" />
                  About
                </MobileNavLink>

                <MobileNavLink
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  index={2}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </MobileNavLink>

                {isLoggedIn ? (
                  <>
                    <MobileNavLink
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      index={3}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </MobileNavLink>

                    <motion.button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 rounded-xl text-destructive font-medium hover:bg-muted text-left flex items-center"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <MobileNavLink
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    index={3}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </MobileNavLink>
                )}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function NavLink({ to, active, children, delay }: { to: string; active: boolean; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`relative px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 overflow-hidden group ${
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
      >
        {/* Animated background on hover */}
        <motion.div
          className={`absolute inset-0 rounded-xl ${
            active
              ? "bg-primary/10"
              : "bg-muted"
          }`}
          initial={{ x: active ? 0 : '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Border glow on active */}
        {active && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-primary/50"
            animate={{
              boxShadow: [
                '0 0 0px rgba(139, 92, 246, 0.3)',
                '0 0 20px rgba(139, 92, 246, 0.6)',
                '0 0 0px rgba(139, 92, 246, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Link>
    </motion.div>
  );
}

function MobileNavLink({ to, onClick, children, index }: { to?: string; onClick: () => void; children: React.ReactNode; index: number }) {
  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { delay: index * 0.1 }
    }
  };

  if (to) {
    return (
      <motion.div
        variants={variants}
        whileHover={{ x: 4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to={to}
          onClick={onClick}
          className="relative px-4 py-3 rounded-xl text-foreground font-medium hover:bg-muted flex items-center overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-muted"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center">
            {children}
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className="relative px-4 py-3 rounded-xl text-foreground font-medium hover:bg-muted flex items-center w-full text-left overflow-hidden group"
      variants={variants}
      whileHover={{ x: 4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-muted"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10 flex items-center">
        {children}
      </span>
    </motion.button>
  );
}