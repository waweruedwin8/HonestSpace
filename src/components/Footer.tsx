import { Home, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">HonestSpace</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Africa's rental platform where every listing is verified and every review is real. 
              Building trust, one property at a time.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-smooth" />
              <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-smooth" />
              <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-smooth" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Browse Properties</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">List Your Property</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Become a Scout</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">How it Works</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Trust & Safety</a>
            </div>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Help Center</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Contact Us</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Report a Problem</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Privacy Policy</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-smooth">Terms of Service</a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">edwin@honestspace.online</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2025 HonestSpace. All rights reserved. Building trust in African rentals.
          </p>
        </div>
      </div>
    </footer>
  );
};