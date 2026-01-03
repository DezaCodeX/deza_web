import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const AboutSection = () => {
  const features = [
    {
      title: "Unique Visual Identity",
      description: "Custom designs that reflect your brand's personality and stand out from the competition.",
    },
    {
      title: "Lightning Fast Performance",
      description: "Optimized code and modern technologies ensure your site loads in the blink of an eye.",
    },
    {
      title: "SEO Optimized",
      description: "Built with search engines in mind to help your business get discovered online.",
    },
    {
      title: "Value-Driven Solutions",
      description: "Quality websites that deliver real results without breaking your budget.",
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <ScrollReveal>
              <span className="text-primary font-semibold tracking-widest uppercase text-sm">
                About Us
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-3 mb-4">
                Building Digital Excellence for
                <span className="text-gradient"> Market Leaders</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
                At <span className="text-primary font-bold">D</span>eza<span className="text-primary font-bold">C</span>ode<span className="text-foreground font-bold">X</span>, we partner with forward-thinking businesses to architect digital solutions that drive competitive advantage. Our multidisciplinary team combines strategic thinking, technical expertise, and design excellence to deliver transformative digital experiences.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                  <motion.div 
                    className="flex gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-base text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Visual */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="bracket-decoration">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-card p-1">
                  <div className="rounded-xl bg-secondary/50 p-8 grid grid-cols-2 gap-4">
                    {[
                      { icon: "⚡", label: "Fast", color: "from-yellow-500/20 to-orange-500/20" },
                      { icon: "🎨", label: "Beautiful", color: "from-pink-500/20 to-purple-500/20" },
                      { icon: "📱", label: "Responsive", color: "from-blue-500/20 to-cyan-500/20" },
                      { icon: "🔒", label: "Secure", color: "from-green-500/20 to-emerald-500/20" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className={`bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-xl p-6 text-center border border-border/50 hover:border-primary/50 transition-all duration-300`}
                        whileHover={{ scale: 1.05, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <div className="font-display font-semibold text-foreground">
                          {item.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/15 rounded-full blur-3xl animate-pulse-glow delay-300" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
