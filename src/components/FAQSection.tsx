import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { supabase } from "@/lib/supabaseClient";

interface FAQSectionProps {
}

const FAQSection = ({}: FAQSectionProps) => {
  const [contactInfo, setContactInfo] = useState({
    email: "hello@dezacodex.in",
    phone: "+91 98765 43210",
    location: "India"
  });

  useEffect(() => {
    async function fetchContact() {
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

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Contact Info */}
          <div>
            <ScrollReveal>
              <span className="text-primary font-semibold tracking-widest uppercase text-sm">
                Get In Touch
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-3 mb-4">
                Let's Discuss Your
                <span className="text-gradient"> Digital Vision</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">
                Ready to elevate your digital presence? Reach out to our team to explore how we can drive your business forward.
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
                    <p className="text-muted-foreground text-base">
                      {contactInfo.email}
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
                    <p className="text-muted-foreground text-base">
                      {contactInfo.phone}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <motion.div
                  className="bg-gradient-card rounded-2xl p-8 border border-border relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">
                      Location
                    </h3>
                    <p className="text-muted-foreground text-base">
                      {contactInfo.location}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div>
            <ScrollReveal delay={0.6}>
              <motion.div
                className="bg-gradient-card rounded-2xl p-8 border border-border relative overflow-hidden group h-full flex flex-col justify-center"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                    Send us a Message
                  </h3>
                  <EnquiryForm />
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
