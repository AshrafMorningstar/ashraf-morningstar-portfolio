import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.to(".mobile-menu", { 
        x: '0%', 
        duration: 0.5, 
        ease: "power3.inOut" 
      });
      gsap.fromTo(".mobile-link", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.2, duration: 0.4 }
      );
    } else {
      gsap.to(".mobile-menu", { 
        x: '100%', 
        duration: 0.5, 
        ease: "power3.inOut" 
      });
    }
  };

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Expertise', href: '#skills' },
    { name: 'Experience', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-onyx/90 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className={`text-xl font-serif font-bold tracking-widest z-50 transition-colors ${scrolled ? 'text-cream' : 'text-onyx md:text-cream'}`}>
            A. MORNINGSTAR
          </a>

          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:text-crimson relative group ${scrolled ? 'text-cream/70' : 'text-cream/50 md:text-cream/70'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-crimson transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <button onClick={toggleMenu} className="md:hidden z-50 text-crimson focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div className="mobile-menu fixed top-0 right-0 w-full h-screen bg-onyx z-40 transform translate-x-full flex flex-col justify-center items-center">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            onClick={(e) => handleLinkClick(e, link.href)}
            className="mobile-link text-4xl font-serif font-bold mb-8 text-cream hover:text-crimson transition-colors"
          >
            {link.name}
          </a>
        ))}
        <div className="mobile-link mt-12 text-[10px] text-crimson tracking-[0.5em] font-bold">
          SYSTEMS ENGINEER
        </div>
      </div>
    </>
  );
};

export default Navbar;