import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

const Index = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onEnquiryClick={() => setIsEnquiryOpen(true)} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection onEnquiryClick={() => setIsEnquiryOpen(true)} />
        <ProcessSection />
        <FAQSection />
      </main>
      <Footer />
      
      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        title="Student Project Enquiry"
      />
    </div>
  );
};

export default Index;
