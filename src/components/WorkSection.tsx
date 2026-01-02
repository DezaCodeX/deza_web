import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface WorkSectionProps {
  onEnquiryClick?: () => void;
}

const WorkSection = ({ onEnquiryClick }: WorkSectionProps) => {
  const [clientProjects, setClientProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        console.log('Supabase not available, skipping fetch');
        setClientProjects([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('work').select('*');
        if (error) {
          console.error('Error fetching works:', error);
        } else {
          setClientProjects(data || []);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const studentProjects = [
    {
      title: "E-Commerce Platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      difficulty: "Advanced",
    },
    {
      title: "Task Management App",
      technologies: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      difficulty: "Intermediate",
    },
    {
      title: "Social Media Platform",
      technologies: ["Next.js", "PostgreSQL", "Socket.io", "Redux"],
      difficulty: "Advanced",
    },
    {
      title: "Fitness Tracker",
      technologies: ["React", "Express", "MySQL", "Chart.js"],
      difficulty: "Intermediate",
    },
    {
      title: "AI Chatbot",
      technologies: ["Python", "Flask", "React", "TensorFlow"],
      difficulty: "Advanced",
    },
    {
      title: "Weather Dashboard",
      technologies: ["Vue.js", "APIs", "D3.js", "WebSockets"],
      difficulty: "Intermediate",
    },
  ];

  return (
    <section id="work" className="section-padding relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              Our Portfolio
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              <span className="text-gradient">Curated Creations</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-2xl">
              Take a look at some of the projects we've delivered for our clients.
              Each project is crafted with attention to detail and excellence.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid - 2 columns for client projects, then student projects as spanning card */}
        <div className="space-y-8">
          {/* Client Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <div className="bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-6 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              clientProjects.map((project, index) => (
                <ScrollReveal 
                  key={project.id || index} 
                  delay={0.1 * index}
                  direction={index % 2 === 0 ? "left" : "right"}
                >
                  <motion.div
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <motion.img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* View Project Button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <a
                          href={project.link.includes('://') ? project.link : project.link === '#' ? '#' : `https://${project.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-background/90 backdrop-blur-sm rounded-full text-foreground font-semibold flex items-center gap-2 hover:bg-background transition-colors"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-primary text-base font-medium tracking-wide">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-display font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>

                    {/* Border Glow on Hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                </ScrollReveal>
              ))
            )}
          </div>

          {/* Student Projects Container - Like SaaS Dashboard */}
          <ScrollReveal delay={0.4}>
            <motion.div
              className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors mt-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative p-8 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <span className="text-accent text-base font-semibold tracking-widest uppercase">
                    Student Projects
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-3">
                    Ready-to-Build <span className="text-gradient">Project Ideas</span>
                  </h3>
                  <p className="text-muted-foreground text-2xl">
                    Industry-ready final year project ideas perfect for learning and submission. Get expert guidance on implementing these projects.
                  </p>
                </div>

                {/* Projects Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="group/card relative bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-4 hover:border-primary/50 hover:bg-card transition-all"
                      whileHover={{ y: -3 }}
                    >
                      {/* Difficulty Badge */}
                      <div className="mb-3 flex items-start justify-between">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          project.difficulty === "Advanced" 
                            ? "bg-primary/20 text-primary" 
                            : "bg-accent/20 text-accent"
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-display font-bold text-foreground mb-3 group-hover/card:text-primary transition-colors">
                        {project.title}
                      </h4>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-1.5 py-0.5 rounded bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Border Glow */}
                      <div className="absolute inset-0 rounded-lg border-2 border-primary opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={onEnquiryClick}
                    variant="hero"
                    size="lg"
                    className="px-8"
                  >
                    Get Help With Your Project
                  </Button>
                </div>
              </div>

              {/* Border Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="text-center mt-20">
            <Button variant="heroOutline" size="lg">
              View All Projects
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WorkSection;
