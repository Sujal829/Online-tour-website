import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, User, LogOut, Heart, Calendar, Sun, Moon, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/authSlice';
import { toggleTheme, toggleMobileMenu, closeMobileMenu } from '@/features/ui/uiSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
  const { theme, mobileMenuOpen } = useSelector((state) => state.ui);
  const { wishlist } = useSelector((state) => state.packages);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeMobileMenu());
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => dispatch(closeMobileMenu())}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Plane className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">TravelWorld</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              className="text-muted-foreground"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {isAuthenticated ? (
              <>
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                    <Heart className="w-5 h-5" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                  </Button>
                </Link>
                {role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 pl-2 border-l border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{user?.firstName}</span>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => dispatch(toggleMobileMenu())}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => dispatch(closeMobileMenu())}
                className={`block py-2 font-medium ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-border pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => dispatch(closeMobileMenu())}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Bookings
                    </Button>
                  </Link>
                  <Link to="/wishlist" onClick={() => dispatch(closeMobileMenu())}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist ({wishlist.length})
                    </Button>
                  </Link>
                  {role === 'admin' && (
                    <Link to="/admin" onClick={() => dispatch(closeMobileMenu())}>
                      <Button variant="outline" className="w-full">Admin Dashboard</Button>
                    </Link>
                  )}
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => dispatch(closeMobileMenu())}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=register" onClick={() => dispatch(closeMobileMenu())}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
