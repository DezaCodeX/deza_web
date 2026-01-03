import { Code, Palette, Smartphone, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Scalable web solutions engineered for performance and conversion.",
      details: `
We design and develop scalable, secure, and high-performance web applications aligned with modern business needs. Our development approach focuses on clean architecture, modular components, and long-term scalability.

From simple websites to complex enterprise dashboards, we ensure fast load times, SEO optimization, and seamless user experiences across all devices. Every solution follows industry best practices for security, performance monitoring, and maintainability.
      `,
      bullets: [
        "Scalable and future-ready application architecture",
        "SEO-friendly and performance-optimized websites",
        "Secure coding practices and data protection",
        "Cross-browser and cross-device compatibility",
        "Easy maintenance and long-term support",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Strategic design systems that drive user engagement and business growth.",
      details: `
Our UI/UX design process is driven by user behavior, usability principles, and business goals. We transform complex ideas into intuitive, visually appealing interfaces that are easy to use and navigate.

We focus on creating consistent design systems, reusable components, and meaningful interactions that enhance user satisfaction and brand identity.
      `,
      bullets: [
        "User-centered and research-driven design approach",
        "Clean, modern, and consistent visual designs",
        "Scalable design systems and UI components",
        "Accessibility and usability-focused layouts",
        "Improved user engagement and retention",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description:
        "Native and cross-platform mobile applications with enterprise reliability.",
      details: `
We build reliable, high-performance mobile applications for Android and iOS platforms. Our apps are designed to deliver smooth user experiences with offline capabilities and real-time data synchronization.

By using modern frameworks and native technologies, we ensure optimal performance, secure data handling, and seamless backend integration.
      `,
      bullets: [
        "Native and cross-platform mobile applications",
        "High performance with smooth user interactions",
        "Offline access and real-time data synchronization",
        "Secure API and backend integrations",
        "Scalable architecture for future growth",
      ],
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            What We Provide
          </span>
          <h2 className="text-5xl font-bold mt-4 mb-6">
            Services That <span className="text-gradient">Elevate</span> Your
            Business
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive digital solutions designed for real-world impact and
            sustainable growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="relative bg-card border border-border rounded-2xl p-8 flex flex-col overflow-hidden"
              >
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 hover:opacity-5 transition-opacity pointer-events-none`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedService(index)}
                    className="mt-auto inline-flex items-center gap-2 text-primary font-semibold cursor-pointer"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4 transition-transform hover:translate-x-1 hover:-translate-y-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setSelectedService(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div
                className="bg-card border border-border rounded-2xl max-w-2xl w-full relative p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5"
                >
                  <X />
                </button>

                <h2 className="text-3xl font-bold mb-4">
                  {services[selectedService].title}
                </h2>

                <p className="text-muted-foreground text-lg leading-relaxed mb-6 whitespace-pre-line">
                  {services[selectedService].details}
                </p>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    What You Get
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {services[selectedService].bullets.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
