import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveDown } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onEnquiryClick: () => void;
}

const HeroSection = ({ onEnquiryClick }: HeroSectionProps) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(pointer: coarse)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      hero.style.setProperty("--pointer-x", `${x * 10}px`);
      hero.style.setProperty("--pointer-y", `${y * 8}px`);
    };

    const resetPointer = () => {
      hero.style.setProperty("--pointer-x", "0px");
      hero.style.setProperty("--pointer-y", "0px");
    };

    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  const particles = [
    [12, 24, "cyan"], [19, 70, "violet"], [29, 16, "blue"], [71, 21, "violet"],
    [83, 39, "cyan"], [89, 68, "blue"], [64, 77, "cyan"], [39, 83, "violet"],
    [7, 52, "blue"], [94, 21, "cyan"], [55, 13, "blue"], [76, 83, "violet"],
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-stage relative z-0 min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-light hero-light-cyan" aria-hidden="true" />
      <div className="hero-light hero-light-violet" aria-hidden="true" />
      <div className="hero-ring hero-ring-outer" aria-hidden="true" />
      <div className="hero-ring hero-ring-inner" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      {particles.map(([left, top, tone], index) => (
        <span
          key={`${left}-${top}`}
          className={`hero-particle hero-particle-${tone}`}
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * -0.65}s` }}
          aria-hidden="true"
        />
      ))}

      <div className="hero-planet hero-planet-left" aria-hidden="true" />
      <div className="hero-planet hero-planet-right" aria-hidden="true" />

      <motion.div className="hero-code-card hero-code-left" initial={{ opacity: 0, x: -40, rotate: -12 }} animate={{ opacity: 1, x: 0, rotate: -6 }} transition={{ delay: 0.65, duration: 0.8 }} aria-hidden="true">
        <span>&lt;</span><i>01</i>
      </motion.div>
      <motion.div className="hero-code-card hero-code-right" initial={{ opacity: 0, x: 40, rotate: 12 }} animate={{ opacity: 1, x: 0, rotate: 6 }} transition={{ delay: 0.8, duration: 0.8 }} aria-hidden="true">
        <span>/&gt;</span><i>DX</i>
      </motion.div>

      <div className="hero-cube hero-cube-one" aria-hidden="true"><span /></div>
      <div className="hero-cube hero-cube-two" aria-hidden="true"><span /></div>
      <div className="hero-cube hero-cube-three" aria-hidden="true"><span /></div>

      <div className="container-wide px-6 md:px-12 relative z-10 pt-20">
        <div className="hero-content max-w-5xl mx-auto text-center">
          <motion.div className="hero-title-panel" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <motion.h1 className="hero-title" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.9 }}>DEZA<span>CODEX</span></motion.h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="hero-subtitle">
            We architect digital solutions that transform business vision into measurable competitive advantage. From conception to deployment, we deliver excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="hero-actions"
          >
            <Button variant="hero" size="xl" className="hero-primary-button group" onClick={onEnquiryClick}>
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="hero-secondary-button" onClick={() => {
              const workSection = document.getElementById("work");
              workSection?.scrollIntoView({ behavior: "smooth" });
            }}>
              View Our Work
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="hero-scroll-indicator" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} aria-label="Scroll to about section">
        <span className="hero-mouse"><i /></span><MoveDown size={14} aria-hidden="true" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
