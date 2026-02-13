import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Layers, Server, Cloud, Shield, MapPin, Mail, Github, Linkedin, 
  Award, Terminal, Star, GitFork, ExternalLink, ChevronDown, ChevronUp 
} from 'lucide-react';
import Navbar from './components/Navbar';
import ThreeHero from './components/ThreeHero';
import CustomCursor from './components/CustomCursor';
import { SKILLS, TIMELINE, CERTIFICATIONS } from './constants';
import { Project, FilterType } from './types';

gsap.registerPlugin(ScrollTrigger);

// Static data for instant loading and consistent "mock image" presentation
const STATIC_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Mstar Youtube Auto Upload Bot',
    category: 'Python',
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    description: "Automated video processing and upload bot for YouTube content creators, featuring metadata optimization and scheduled publishing.",
    year: "2024",
    techStack: ["Python", "YouTube API", "FFmpeg", "Docker"],
    repoUrl: "https://github.com/AshrafMorningstar/mstar-youtube-auto-upload-bot",
    stars: 128,
    forks: 45
  },
  {
    id: 2,
    title: 'New Mstar Ad Blocker',
    category: 'JavaScript',
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    description: "High-performance browser extension blocking intrusive ads and tracking scripts with minimal resource usage and privacy-first architecture.",
    year: "2023",
    techStack: ["JavaScript", "WebExtensions API", "Rust", "WASM"],
    repoUrl: "https://github.com/AshrafMorningstar/new-mstar-ad-blocker",
    stars: 342,
    forks: 89
  },
  {
    id: 3,
    title: 'NexusDigital',
    category: 'Systems',
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    description: "Decentralized computing interface for next-generation digital asset management and distributed orchestration.",
    year: "2023",
    techStack: ["Rust", "Solidity", "React", "gRPC"],
    repoUrl: "https://github.com/AshrafMorningstar/nexusdigital",
    stars: 89,
    forks: 12
  },
  {
    id: 4,
    title: 'VersionVista',
    category: 'TypeScript',
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    description: "Enterprise-grade version control visualization tool designed for complex taxonomy management and schema evolution.",
    year: "2024",
    techStack: ["TypeScript", "D3.js", "GraphQL", "Node.js"],
    repoUrl: "https://github.com/AshrafMorningstar/versionvista",
    stars: 156,
    forks: 23
  },
  {
    id: 5,
    title: 'CloudScale Orchestrator',
    category: 'Go',
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    description: "Autonomous container orchestration system optimized for high-throughput microservices architectures.",
    year: "2022",
    techStack: ["Go", "Kubernetes", "Prometheus", "Terraform"],
    repoUrl: "https://github.com/AshrafMorningstar/cloudscale",
    stars: 210,
    forks: 67
  },
  {
    id: 6,
    title: 'SecureChain Wallet',
    category: 'Security',
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    description: "Hardware-agnostic crypto wallet implementing multi-party computation for threshold signatures.",
    year: "2023",
    techStack: ["C++", "Python", "Cryptography", "Blockchain"],
    repoUrl: "https://github.com/AshrafMorningstar/securechain",
    stars: 180,
    forks: 34
  },
  {
    id: 7,
    title: 'NeuralNet Vision',
    category: 'Python',
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    description: "Real-time edge computing computer vision pipeline for industrial safety monitoring.",
    year: "2021",
    techStack: ["Python", "PyTorch", "OpenCV", "CUDA"],
    repoUrl: "https://github.com/AshrafMorningstar/neuralnet",
    stars: 420,
    forks: 110
  },
  {
    id: 8,
    title: 'EcoTrack IoT',
    category: 'Systems',
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    description: "Low-power IoT firmware for environmental monitoring networks utilizing LoRaWAN.",
    year: "2022",
    techStack: ["C", "Embedded", "IoT", "MQTT"],
    repoUrl: "https://github.com/AshrafMorningstar/ecotrack",
    stars: 95,
    forks: 18
  },
  {
    id: 9,
    title: 'Quantum Encryption Core',
    category: 'Security',
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
    description: "Post-quantum cryptography library providing lattice-based encryption primitives.",
    year: "2024",
    techStack: ["Rust", "Assembly", "Cryptography"],
    repoUrl: "https://github.com/AshrafMorningstar/quantum-core",
    stars: 560,
    forks: 125
  }
];

const ProjectCard: React.FC<{ project: Project; isExpanded: boolean; onToggle: () => void }> = ({ project, isExpanded, onToggle }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Performance optimized hover effect using simple transforms
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced rotation amount for subtlety and performance
    const rotateX = (y - centerY) / 45;
    const rotateY = (centerX - x) / 45;

    // Use GSAP QuickTo or simple sets for better performance if needed, 
    // but overwrite: 'auto' with short duration works well for this effect
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.2, // Faster response
      ease: "power1.out",
      overwrite: "auto"
    });

    gsap.to(imageRef.current, {
      x: (x - centerX) / 30,
      y: (y - centerY) / 30,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(imageRef.current, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
      className={`relative bg-white border border-slate/10 overflow-hidden transition-all duration-500 interactive-card cursor-pointer transform-gpu will-change-transform ${isExpanded ? 'lg:col-span-2 row-span-2' : ''}`}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="relative aspect-video overflow-hidden bg-onyx">
        <img 
          ref={imageRef}
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-700 will-change-transform"
        />
        <div className="absolute inset-0 bg-onyx/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 uppercase text-onyx shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-onyx line-clamp-1">{project.title}</h3>
          <div className="flex gap-3 text-slate shrink-0">
            <div className="flex items-center gap-1 group" title="Stars">
              <Star size={14} className="group-hover:text-yellow-500 transition-colors" />
              <span className="text-xs font-mono">{project.stars || 0}</span>
            </div>
            <div className="flex items-center gap-1 group" title="Forks">
              <GitFork size={14} className="group-hover:text-crimson transition-colors" />
              <span className="text-xs font-mono">{project.forks || 0}</span>
            </div>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
          <p className="text-slate mb-6 leading-relaxed text-sm md:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-sand text-onyx text-[10px] uppercase font-bold border border-slate/10">
                {tech}
              </span>
            ))}
          </div>
          <a 
            href={project.repoUrl} 
            target="_blank" 
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-crimson font-bold uppercase text-xs tracking-widest hover:translate-x-1 transition-transform"
          >
            Explore Repository <ExternalLink size={14} />
          </a>
        </div>

        <button 
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-slate hover:text-onyx transition-colors"
        >
          {isExpanded ? 'Close Details' : 'View Details'}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [projects] = useState<Project[]>(STATIC_PROJECTS);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    // Instant load simulation, just enough for the loader to fade smoothly
    setTimeout(() => setIsLoaded(true), 800);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    // Optimized animations with ScrollTrigger
    // Using batch for better performance on list items
    ScrollTrigger.batch(".project-item", {
      start: "top 85%",
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true
        });
      }
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
      const reveals = sec.querySelectorAll('.cinematic-reveal');
      if (reveals.length) {
        gsap.fromTo(reveals, 
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
            }
          }
        );
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded]);

  const filteredProjects = projects.filter(p => 
    filter === 'All' ? true : p.category === filter || (filter === 'Open Source' && p.category !== 'Full-Stack')
  );

  return (
    <div className="bg-cream text-onyx min-h-screen font-sans selection:bg-crimson selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-onyx">
        <ThreeHero />
        <div className="relative z-10 text-center px-4 pointer-events-none">
          <div className="cinematic-reveal inline-block mb-6 relative">
             <span className="text-crimson font-bold tracking-[0.4em] text-xs md:text-sm uppercase relative z-10">
               Senior Full-Stack & Systems Engineer
             </span>
             <div className="absolute top-1/2 -left-12 w-8 h-[1px] bg-crimson" />
             <div className="absolute top-1/2 -right-12 w-8 h-[1px] bg-crimson" />
          </div>
          
          <h1 className="cinematic-reveal text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold mb-8 text-cream leading-[0.8] tracking-tighter drop-shadow-2xl">
            ASHRAF
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream via-sand to-crimson">MORNINGSTAR</span>
          </h1>
          
          <p className="cinematic-reveal text-sand/60 max-w-2xl mx-auto text-lg md:text-xl font-light mb-12 italic tracking-wide">
            "Correctness before cleverness. Systems engineered for the 99.9%."
          </p>

          <div className="cinematic-reveal flex justify-center gap-6 pointer-events-auto">
            <a href="#projects" className="px-10 py-4 bg-crimson text-cream uppercase text-xs tracking-[0.3em] font-bold hover:bg-white hover:text-onyx transition-all duration-500 shadow-xl">
              Explore Works
            </a>
            <a href="#contact" className="px-10 py-4 border border-cream/30 text-cream uppercase text-xs tracking-[0.3em] font-bold hover:border-crimson hover:text-crimson transition-all duration-500">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-sand/30">
          <span className="text-[10px] uppercase tracking-[0.5em]">Scroll</span>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 cinematic-reveal">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-onyx mb-4">Selected Works</h2>
              <div className="h-1 w-24 bg-crimson" />
            </div>
            <div className="flex gap-4 mt-8 md:mt-0 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {(['All', 'TypeScript', 'Rust', 'Python', 'Go'] as any[]).map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest border transition-all ${filter === f ? 'bg-onyx text-white border-onyx' : 'border-slate/10 text-slate hover:border-onyx hover:text-onyx'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(p => (
              <div key={p.id} className="project-item transform translate-y-10 opacity-0">
                <ProjectCard 
                  project={p} 
                  isExpanded={expandedId === p.id} 
                  onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 bg-sand relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 cinematic-reveal">
            <h2 className="text-5xl font-serif font-bold mb-4">Core Expertise</h2>
            <p className="text-slate max-w-2xl mx-auto">Mastery over the full stack, with deep specializations in systems security and distributed cloud infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12 cinematic-reveal">
              {SKILLS.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex items-center gap-3 font-bold uppercase text-xs tracking-widest text-onyx">
                      <Terminal size={14} className="text-crimson" /> {s.name}
                    </span>
                    <span className="font-mono text-xs text-slate">{s.level}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-slate/10 overflow-hidden">
                    <div className="h-full bg-onyx transition-all duration-1000 group-hover:bg-crimson" style={{ width: `${s.level}%` }} />
                  </div>
                  <p className="mt-4 text-sm text-slate font-light italic">{s.description}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 cinematic-reveal">
              {['AWS', 'Kubernetes', 'Docker', 'Terraform', 'PostgreSQL', 'Redis', 'GraphQL', 'React'].map((tech, i) => (
                <div key={i} className="p-8 bg-white border border-slate/5 flex items-center justify-center font-bold text-xs uppercase tracking-widest text-slate hover:text-crimson hover:shadow-xl transition-all transform hover:-translate-y-1 will-change-transform">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 cinematic-reveal">
            <h2 className="text-5xl font-serif font-bold mb-4">Experience Timeline</h2>
            <p className="text-slate">A chronological journey of professional engineering leadership.</p>
          </div>

          <div className="relative border-l border-slate/10 ml-4 md:ml-12 space-y-16 cinematic-reveal">
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative pl-12 group">
                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-slate/20 rounded-full group-hover:bg-crimson transition-colors" />
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                  <h3 className="text-2xl font-serif font-bold text-onyx">{t.title}</h3>
                  <span className="text-[10px] font-bold text-crimson uppercase tracking-widest">{t.year}</span>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate mb-4">{t.company}</h4>
                <p className="text-slate leading-relaxed font-light">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses & Certifications Section */}
      <section id="certifications" className="py-32 px-6 md:px-12 lg:px-24 bg-white border-y border-slate/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 cinematic-reveal">
            <h2 className="text-5xl font-serif font-bold mb-4">Licenses & Certifications</h2>
            <p className="text-slate">Verified expertise in security research, cloud architecture, and software engineering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cinematic-reveal">
            {CERTIFICATIONS.map((c, i) => (
              <div key={i} className="p-8 bg-sand border border-slate/5 hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden will-change-transform">
                <div className="absolute top-0 left-0 w-1 h-full bg-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white text-crimson rounded-full shadow-sm">
                    {c.icon === 'Award' && <Award size={24} />}
                    {c.icon === 'Shield' && <Shield size={24} />}
                    {c.icon === 'Cloud' && <Cloud size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-onyx mb-1">{c.name}</h3>
                    <p className="text-[10px] uppercase font-bold text-slate tracking-widest mb-4">{c.issuer} — {c.year}</p>
                    <button className="text-[10px] font-bold uppercase text-crimson tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Verify Credential
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-onyx text-cream relative">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="cinematic-reveal">
            <h2 className="text-6xl font-serif font-bold mb-12">Let's Build the Future</h2>
            <p className="text-sand/50 text-xl font-light mb-16 max-w-lg">
              Open for senior consulting roles, architectural reviews, and high-stakes production systems development.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:bg-crimson group-hover:border-crimson transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-sand/80 font-bold tracking-widest uppercase text-sm">ashrafmorningstar@gmail.com</span>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:bg-crimson group-hover:border-crimson transition-all">
                  <MapPin size={20} />
                </div>
                <span className="text-sand/80 font-bold tracking-widest uppercase text-sm">London, UK / Remote</span>
              </div>
            </div>

            <div className="flex gap-6 mt-16">
              <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noreferrer" className="text-sand/40 hover:text-crimson transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/ashrafmorningstar" target="_blank" rel="noreferrer" className="text-sand/40 hover:text-crimson transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <form className="cinematic-reveal space-y-8 bg-white/5 p-12 backdrop-blur-md border border-white/10">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-sand/40">Full Name</label>
              <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-crimson transition-colors" placeholder="Morningstar Systems" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-sand/40">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-crimson transition-colors" placeholder="contact@morningstar.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-sand/40">Project Inquiry</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-crimson transition-colors resize-none" placeholder="Briefly describe your requirements..." />
            </div>
            <button className="w-full py-6 bg-crimson text-cream font-bold uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-onyx transition-all duration-500">
              Transmit Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 text-center">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
          &copy; 2026 ASHRAF MORNINGSTAR — ENGINEERED FOR THE FUTURE
        </p>
      </footer>
    </div>
  );
};

export default App;