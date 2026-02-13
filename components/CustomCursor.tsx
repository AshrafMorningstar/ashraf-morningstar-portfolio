import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      // Main cursor is sharp and fast
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0, // Instant
      });

      // Follower has the "catch-up" elastic feel
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handleHoverStart = (e: Event) => {
      gsap.to(follower, {
        scale: 2.5,
        borderColor: '#8a0303', // crimson
        backgroundColor: 'rgba(138, 3, 3, 0.05)',
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursor, {
        scale: 0,
        duration: 0.2
      });
    };

    const handleHoverEnd = () => {
      gsap.to(follower, {
        scale: 1,
        borderColor: '#1A1A1A', // onyx
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const attachListeners = () => {
      const targets = document.querySelectorAll('a, button, .interactive-card, input');
      targets.forEach(t => {
        t.addEventListener('mouseenter', handleHoverStart);
        t.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-onyx rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-onyx rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
};

export default CustomCursor;