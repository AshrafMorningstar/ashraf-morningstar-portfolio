import React, { useEffect } from 'react';
import { X, Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import gsap from 'gsap';

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(".modal-content", 
        { y: 100, opacity: 0, rotateX: -5 }, 
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-onyx/90 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      ></div>
      
      <div className="modal-content relative bg-cream w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate/10">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white rounded-full text-white hover:text-crimson transition-all duration-300 backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        <div className="md:w-3/5 h-64 md:h-auto relative group overflow-hidden bg-onyx">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute bottom-8 left-8 text-cream">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-2 shadow-sm">
              {project.title}
            </h2>
             <div className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase">
               <span className="text-crimson bg-white/10 px-2 py-1 backdrop-blur-sm rounded">{project.category}</span>
               <span className="text-slate">{project.year}</span>
             </div>
          </div>
        </div>

        <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-between bg-white relative">
          <div>
            <div className="flex gap-6 mb-8 text-onyx/80">
              <div className="flex items-center gap-2 group hover:text-crimson transition-colors" title="Stars">
                <Star size={18} className="fill-current" />
                <span className="font-bold text-lg">{project.stars || 0}</span>
              </div>
              <div className="flex items-center gap-2 group hover:text-crimson transition-colors" title="Forks">
                <GitFork size={18} />
                <span className="font-bold text-lg">{project.forks || 0}</span>
              </div>
            </div>

            <p className="text-slate leading-relaxed mb-8 text-lg font-light">
              {project.description}
            </p>

            <div className="space-y-4">
              <h3 className="font-bold text-onyx uppercase tracking-wide text-xs">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <div key={idx} className="group relative">
                    <span className="px-3 py-1 bg-sand text-onyx text-xs font-medium tracking-wide border border-slate/20 hover:border-crimson hover:text-crimson transition-colors cursor-default">
                      {tech}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-onyx text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate/10">
            <a 
              href={project.repoUrl || "#"} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center justify-between w-full px-6 py-4 bg-onyx text-cream uppercase tracking-widest text-sm hover:bg-crimson transition-colors duration-300 rounded-sm"
            >
              <div className="flex items-center gap-3">
                <Github size={18} />
                <span>View Repository</span>
              </div>
              <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;