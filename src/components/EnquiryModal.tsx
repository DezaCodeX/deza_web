import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, Loader } from "lucide-react";
import emailjs from '@emailjs/browser';
import { supabase } from '@/lib/supabaseClient';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const EnquiryModal = ({ isOpen, onClose, title = "Project Enquiry" }: EnquiryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectTitle: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Initialize EmailJS with public key from env
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.projectTitle || !formData.message) {
      alert("Please fill all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Insert to Supabase
      const { data: insertData, error: insertError } = await supabase
        .from('enquiries')
        .insert([formData]);

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw new Error('Failed to save enquiry.');
      }

      // Send email via EmailJS
      if (formRef.current) {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      }

      console.log("Enquiry submitted:", formData);
      setSubmitStatus("success");

      // Reset after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectTitle: "",
          message: "",
        });
        setSubmitStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success State */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center flex-col gap-4 z-50"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <CheckCircle size={64} className="text-green-500" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground">
                        We'll reach out soon with your proposal.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>
                  <p className="text-xs text-muted-foreground mt-1">Quick & Simple</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                  />
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    required
                    placeholder="Your project name"
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Brief Description *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project in a few lines..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full mt-6 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Enquiry"
                  )}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
