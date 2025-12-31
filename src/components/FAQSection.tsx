import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Header */}
          <div>
            <ScrollReveal>
              <span className="text-primary font-semibold tracking-widest uppercase text-sm">
                Get In Touch
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
                Contact
                <span className="text-gradient"> Us</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-2xl mb-10">
                Have a project in mind? We'd love to hear from you. Get in touch
                with us and let's discuss how we can help bring your ideas to life.
              </p>
            </ScrollReveal>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <ScrollReveal delay={0.3}>
                <motion.div 
                  className="bg-gradient-card rounded-2xl p-8 border border-border relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Mail className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">
                      Email
                    </h3>
                    <p className="text-muted-foreground text-base\">
                      hello@dezacodex.in
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <motion.div 
                  className="bg-gradient-card rounded-2xl p-8 border border-border relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Phone className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">
                      Phone
                    </h3>
                    <p className="text-muted-foreground text-base\">
                      +91 98765 43210
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>


            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <ScrollReveal delay={0.2}>
              <motion.div 
                className="bg-gradient-card rounded-2xl p-8 border border-border relative overflow-hidden group h-full flex flex-col justify-center"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                    Send us a Message
                  </h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-foreground font-semibold mb-2">Name</label>
                      <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-foreground font-semibold mb-2">Email</label>
                      <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-foreground font-semibold mb-2">Message</label>
                      <textarea placeholder="Tell us about your project..." rows={5} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
                    </div>
                    <Button variant="hero" className="w-full group/btn">
                      Send Message
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
