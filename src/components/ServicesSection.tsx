import { Code, Palette, Smartphone, ArrowUpRight, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Scalable web solutions engineered for performance and conversion.",
      details: "We architect and develop enterprise-grade web applications leveraging cutting-edge technologies including React, Next.js, Node.js, and TypeScript. Our solutions are optimized for speed, accessibility, and SEO, ensuring maximum reach and engagement. Every project includes comprehensive testing, security hardening, and deployment automation for production-ready applications.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Strategic design systems that drive user engagement and business growth.",
      details: "Our design methodology combines user research, wireframing, and iterative prototyping to create intuitive interfaces. We develop comprehensive design systems and component libraries that ensure consistency, maintainability, and scalability. Every design decision is grounded in user behavior analytics and conversion optimization principles.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Native and cross-platform mobile applications with enterprise reliability.",
      details: "We deliver high-performance mobile applications for iOS and Android using React Native, Flutter, and native frameworks. Our development process includes comprehensive testing, performance optimization, and app store deployment expertise. Applications are built with offline capabilities, real-time synchronization, and seamless platform integration.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="services" className="section-padding bg-card/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <ScrollReveal>
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              What We Provide
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-3 mb-4">
              Services That <span className="text-gradient">Elevate</span> Your Business
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg md:text-xl">
              Comprehensive digital solutions engineered for measurable business impact and sustainable growth.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={0.1 * index}>
              <motion.div
                className="group relative h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-full bg-card rounded-2xl p-8 border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-glow-sm">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    {(() => {
                      const IconComponent = service.icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn More Button */}
                  <button
                    onClick={() => setSelectedService(index)}
                    className="inline-flex items-center gap-2 text-primary font-semibold group/link hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors p-2 z-10"
                >
                  <X size={24} />
                </button>

                {/* Header */}
                <div className={`bg-gradient-to-r ${services[selectedService!].gradient} p-8`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      {(() => {
                        const IconComponent = services[selectedService!].icon;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white">
                      {services[selectedService!].title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {services[selectedService!].description}
                  </p>
                  <div className="border-t border-border pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Details</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {services[selectedService!].details}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
