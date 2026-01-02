import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader } from "lucide-react";
import emailjs from '@emailjs/browser';
import { supabase } from '@/lib/supabaseClient';

interface EnquiryFormProps {
  onSuccess?: () => void;
}

const EnquiryForm = ({ onSuccess }: EnquiryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.warn('VITE_EMAILJS_PUBLIC_KEY is not set');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submit called');
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
      console.log('Validation failed - missing fields after trim:', { trimmedName: !!trimmedName, trimmedEmail: !!trimmedEmail, trimmedPhone: !!trimmedPhone, trimmedMessage: !!trimmedMessage });
      alert("Please fill all fields correctly.");
      setIsSubmitting(false);
      return;
    }

    console.log('Validation passed');

    try {
      // Check if environment variables are properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
      console.log('EmailJS Service ID:', emailjsServiceId ? 'Set' : 'Not set');

      const isSupabaseConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes('your-supabase-url');
      const isEmailJSConfigured = emailjsServiceId && emailjsTemplateId && !emailjsServiceId.includes('your-emailjs');

      if (isSupabaseConfigured) {
        console.log('Submitting to Supabase...');
        const { error: insertError } = await supabase
          .from('enquiries')
          .insert([formData]);

        if (insertError) {
          throw new Error(`Failed to save enquiry: ${insertError.message}`);
        }
        console.log('Supabase submission successful');
      } else {
        console.log('Supabase not configured, skipping database submission');
      }

      if (isEmailJSConfigured && formRef.current) {
        console.log('Submitting to EmailJS...');
        await emailjs.sendForm(emailjsServiceId, emailjsTemplateId, formRef.current);
        console.log('EmailJS submission successful');
      } else {
        console.log('EmailJS not configured, skipping email submission');
      }

      // If neither is configured, simulate success for development
      if (!isSupabaseConfigured && !isEmailJSConfigured) {
        console.log('Form submitted (development mode - no backend configured):', formData);
        alert('Form submitted successfully (development mode - no backend configured)');
      }

      console.log('Setting success status');
      setSubmitStatus("success");

      setTimeout(() => {
        console.log('Resetting form');
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setSubmitStatus("idle");
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      const msg = error instanceof Error ? error.message : String(error);
      alert('Failed to submit enquiry. ' + msg);
    } finally {
      setIsSubmitting(false);
      console.log('Submission process complete');
    }
  };

  return (
    <div className="relative">
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

      <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Brief Description *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your project in a few lines..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm"
          />
        </div>

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
    </div>
  );
};

export default EnquiryForm;
