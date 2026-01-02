import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

interface HeroSectionProps {
  onEnquiryClick: () => void;
}

const HeroSection = ({ onEnquiryClick }: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Animated Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px] animate-pulse-glow delay-500" />

      {/* Decorative Brackets */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-1/4 left-[10%] text-primary/40 text-8xl font-mono hidden lg:block"
      >
        {"<"}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute top-1/4 right-[10%] text-accent/40 text-8xl font-mono hidden lg:block"
      >
        {"/>"}
      </motion.div>

      {/* Floating Stars */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[20%] hidden lg:block"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M12 2L15 9H22L16 14L18 22L12 17L6 22L8 14L2 9H9L12 2Z" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[35%] left-[15%] hidden lg:block"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path d="M12 2L15 9H22L16 14L18 22L12 17L6 22L8 14L2 9H9L12 2Z" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="container-wide px-6 md:px-12 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <motion.h1 
              className="hero-text text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-primary font-bold">D</span>eza<span className="text-primary font-bold">C</span>ode<span className="text-foreground font-bold">X</span>
            </motion.h1>
          </div>

          {/* Ghost Text Behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
          >
            <span className="hero-text text-[12rem] text-foreground whitespace-nowrap">
              <span className="text-primary font-bold">D</span>eza<span className="text-primary font-bold">C</span>ode<span className="text-foreground font-bold">X</span>
            </span>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 px-6 md:px-4"
          >
            We build stunning, high-performance websites that captivate your
            audience and drive business growth. From concept to launch, we're
            your digital partners.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={onEnquiryClick}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => {
              const workSection = document.getElementById("work");
              workSection?.scrollIntoView({ behavior: "smooth" });
            }}>
              View Our Work
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
