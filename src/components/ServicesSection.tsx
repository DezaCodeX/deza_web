import { Code, Palette, Smartphone, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom websites built with the latest technologies. From simple landing pages to complex web applications, we deliver solutions that scale.",
      features: ["React & Next.js", "Node.js Backend", "API Integration", "E-commerce"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "User-centered designs that create memorable experiences. We combine aesthetics with functionality to engage your audience.",
      features: ["User Research", "Wireframing", "Prototyping", "Brand Identity"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description:
        "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
      features: ["iOS & Android", "React Native", "Flutter", "PWA"],
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="services" className="section-padding bg-card/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              What We Provide
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Services That <span className="text-gradient">Elevate</span> Your Business
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-2xl">
              We offer comprehensive digital solutions tailored to your unique needs,
              helping you achieve your business goals.
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
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="text-base text-muted-foreground flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Link */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary font-semibold group/link"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
