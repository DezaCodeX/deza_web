import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryModal from "./EnquiryModal";
import { supabase } from "@/lib/supabaseClient";

import logo from "../../../deza.png";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "hello@dezacodex.in",
    phone: "+91 98765 43210",
    location: "India"
  });

  const [showContactPopup, setShowContactPopup] = useState(false);

  useEffect(() => {
    async function fetchContact() {
      if (!supabase) {
        console.log('Supabase not available, using default contact info');
        return;
      }
      const { data, error } = await supabase
        .from('contact')
        .select('email, phone, location')
        .single();  // Assuming one contact row

      if (error) {
        console.error('Error fetching contact info:', error);
      } else if (data) {
        setContactInfo({
          email: data.email || contactInfo.email,
          phone: data.phone || contactInfo.phone,
          location: data.location || contactInfo.location
        });
      }
    }
    fetchContact();
  }, []);

  const links = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Portfolio", href: "#work" },
      { name: "Process", href: "#process" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "GitHub", href: "#" },
  ];

  return (
    <footer className="bg-card/50 border-t border-border relative overflow-hidden">
      {/* CTA Section */}
      <div className="section-padding border-b border-border">
        <div className="container-wide">
          <ScrollReveal>
            <motion.div 
              className="relative rounded-3xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              
              {/* Glowing Orbs */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-[80px]" />

              <div className="relative p-12 md:p-16 lg:p-20 text-center">
                <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-6">
                  Ready to Start Your <span className="text-gradient">Project?</span>
                </h2>
                <p className="text-muted-foreground text-2xl max-w-2xl mx-auto mb-10">
                  Let's work together to create something amazing. Get in touch with
                  us today and let's discuss your next big idea.
                </p>
                <Button
                  variant="hero"
                  size="xl"
                  className="group"
                  onClick={() => setShowContactPopup(true)}
                >
                  Get in Touch
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding pb-8">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <a href="#home" className="flex items-center gap-3 mb-6 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <img src={logo} alt="DezaCodex Logo" className="w-full h-full rounded-lg object-contain" />
                  </div>
                </div>
                <span className="font-display font-bold text-xl">
                  Deza<span className="text-primary">C</span>ode<span className="text-foreground">X</span>
                </span>
              </a>
              <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
                Crafting exceptional digital experiences that drive business growth
                and leave lasting impressions.
              </p>
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5" />
                  {contactInfo.email}
                </motion.a>
                <motion.a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="w-5 h-5" />
                  {contactInfo.phone}
                </motion.a>
                <motion.div 
                  className="flex items-center gap-3 text-muted-foreground"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5" />
                  {contactInfo.location}
                </motion.div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-6">
                Follow Us
              </h3>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Deza Codex. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Contact Popup */}
      <AnimatePresence>
        {showContactPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactPopup(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-4">Get in Touch</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                    <motion.a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Mail className="w-5 h-5" />
                      {contactInfo.email}
                    </motion.a>
                    <motion.a
                      href={`tel:${contactInfo.phone}`}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Phone className="w-5 h-5" />
                      {contactInfo.phone}
                    </motion.a>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowContactPopup(false)}
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </footer>
  );
};

export default Footer;
