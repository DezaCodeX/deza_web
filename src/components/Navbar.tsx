import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Moon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import logo from "/deza.png";

interface NavbarProps {
  onEnquiryClick?: () => void;
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Contact Us", href: "#contact" },
];

const Navbar = ({ onEnquiryClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const sections = navLinks.map(({ href }) => document.getElementById(href.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => section && observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSmoothScroll = (href: string) => {
    const sectionId = href.replace("#", "");
    const target = document.getElementById(sectionId);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`site-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "site-nav-scrolled" : ""}`}
    >
      <div className="container-wide px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" aria-label="DezaCodex home">
            <div className="relative nav-logo-mark">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:shadow-glow-sm transition-shadow duration-300">
                <img src={logo} alt="DezaCodex Logo" className="w-full h-full rounded-lg object-contain" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-white blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl">
              Deza<span className="text-gradient">Codex</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => handleSmoothScroll(link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`nav-link relative px-4 py-2 transition-colors duration-300 group bg-transparent border-none cursor-pointer ${activeSection === link.href.slice(1) ? "text-cyan-300" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-primary transition-all duration-300 ${activeSection === link.href.slice(1) ? "w-2/3" : "w-0 group-hover:w-full"}`} />
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            <Button
              variant="hero"
              size="default"
              onClick={onEnquiryClick}
            >
              Get Started
            </Button>
            <button
              type="button"
              className="nav-theme-toggle"
              aria-label="Dark theme enabled"
              title="Dark theme enabled"
            >
              <Moon size={16} aria-hidden="true" />
            </button>
          </motion.div>

          <button
            className="md:hidden text-foreground p-2 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="py-4 border-t border-border">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      onClick={() => handleSmoothScroll(link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className={`px-4 py-3 rounded-lg transition-all duration-300 text-left bg-transparent border-none cursor-pointer w-full ${activeSection === link.href.slice(1) ? "text-cyan-300 bg-cyan-300/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                    >
                      {link.name}
                    </motion.button>
                  ))}
                  <Button
                    variant="hero"
                    size="lg"
                    className="mt-4"
                    onClick={onEnquiryClick}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
