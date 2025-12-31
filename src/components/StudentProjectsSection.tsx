import { Code, Database, Palette, Smartphone, GitBranch, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StudentProjectsSectionProps {
  onEnquiryClick?: () => void;
}

const StudentProjectsSection = ({ onEnquiryClick }: StudentProjectsSectionProps) => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      icon: ShoppingCart,
      difficulty: "Advanced",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management system with real-time updates, team features, and analytics dashboard.",
      technologies: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      icon: CheckSquare,
      difficulty: "Intermediate",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Social Media Platform",
      description: "Social networking app with user profiles, posts, likes, comments, and real-time notifications.",
      technologies: ["Next.js", "PostgreSQL", "Socket.io", "Redux"],
      icon: Users,
      difficulty: "Advanced",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Fitness Tracker",
      description: "Mobile-responsive fitness tracking application with workout logs, progress analytics, and goals.",
      technologies: ["React", "Express", "MySQL", "Chart.js"],
      icon: Activity,
      difficulty: "Intermediate",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "AI Chatbot",
      description: "Intelligent chatbot using NLP with conversation history, context awareness, and learning capabilities.",
      technologies: ["Python", "Flask", "React", "TensorFlow"],
      icon: MessageCircle,
      difficulty: "Advanced",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with location services, forecasts, and interactive maps.",
      technologies: ["React", "OpenWeather API", "Mapbox", "Redux"],
      icon: Cloud,
      difficulty: "Beginner",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section id="student-projects" className="section-padding bg-card/30 relative overflow-hidden">
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
              Student Resources
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Final Year <span className="text-gradient">Project Ideas</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-2xl">
              Get inspired with these project ideas perfect for your final year. From beginner-friendly to advanced,
              find the project that matches your skill level and interests.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={0.1 * index}>
              <motion.div
                className="group relative h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-full bg-card rounded-2xl p-8 border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-glow-sm">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Difficulty Badge */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold
                      ${project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' : ''}
                      ${project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${project.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-400' : ''}
                    `}>
                      {project.difficulty}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <project.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-base mb-6 leading-relaxed\">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full group/btn"
                  >
                    View Details
                  </Button>

                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Section */}
        <ScrollReveal delay={0.5}>
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground text-2xl mb-6">
              Have a unique project idea? We can help you build it!
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={onEnquiryClick}
            >
              Get Help With Your Project
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Icons for student projects
const ShoppingCart = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CheckSquare = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const Users = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Activity = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const MessageCircle = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Cloud = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

export default StudentProjectsSection;
