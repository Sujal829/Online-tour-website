import { Link } from 'react-router-dom';
import { Plane, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Mock newsletter subscription
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-primary-foreground">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-foreground/80">
                Get the latest travel deals and destination guides
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground text-foreground min-w-[250px]"
                required
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Plane className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">TravelWorld</span>
            </Link>
            <p className="text-background/70 mb-6">
              Discover the world's most amazing destinations with our expertly curated travel packages.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/destinations" className="text-background/70 hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-background/70 hover:text-primary transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-background/70 hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/packages?category=adventure" className="text-background/70 hover:text-primary transition-colors">
                  Adventure Tours
                </Link>
              </li>
              <li>
                <Link to="/packages?category=honeymoon" className="text-background/70 hover:text-primary transition-colors">
                  Honeymoon Packages
                </Link>
              </li>
              <li>
                <Link to="/packages?category=family" className="text-background/70 hover:text-primary transition-colors">
                  Family Vacations
                </Link>
              </li>
              <li>
                <Link to="/packages?category=solo" className="text-background/70 hover:text-primary transition-colors">
                  Solo Travel
                </Link>
              </li>
              <li>
                <Link to="/packages?category=luxury" className="text-background/70 hover:text-primary transition-colors">
                  Luxury Escapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">
                  123 Travel Street, Adventure City, TC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+1234567890" className="text-background/70 hover:text-primary transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@travelworld.com" className="text-background/70 hover:text-primary transition-colors">
                  info@travelworld.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © 2024 TravelWorld. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-background/50 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-background/50 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
