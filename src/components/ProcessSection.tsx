import { MessageSquare, Lightbulb, PenTool, Code } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Meeting",
      description:
        "We start by understanding your vision, goals, and requirements through an in-depth consultation.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Brainstorming",
      description:
        "Our team analyzes your needs and develops creative strategies and solutions for your project.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      number: "03",
      icon: PenTool,
      title: "Design & Prototyping",
      description:
        "We create stunning visual designs and interactive prototypes for your approval before development.",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "04",
      icon: Code,
      title: "Development",
      description:
        "Our developers bring the design to life with clean, efficient code and thorough testing.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="process" className="section-padding bg-card/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              Our Process
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              How We <span className="text-gradient">Work</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg">
              Our proven process ensures every project is delivered with excellence,
              on time, and exceeds expectations.
            </p>
          </ScrollReveal>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={0.15 * index}>
                <motion.div 
                  className="relative group"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow-sm h-full">
                    {/* Number Badge */}
                    <motion.div
                      className={`absolute -top-5 left-8 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-display font-bold text-white text-lg shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.number}
                    </motion.div>

                    {/* Icon */}
                    <div className="mt-8 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover Indicator */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>

                  {/* Connector Arrow (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 -translate-y-1/2 z-10">
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-full h-full text-primary/50"
                        initial={{ x: -5, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.2 }}
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
