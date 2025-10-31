import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const AstraNetAbout = () => {
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const problemTextRef = useRef(null);
  const workflowRef = useRef(null);
  const teamRef = useRef(null);
  const techScrollerRef = useRef(null);
  const ctaRef = useRef(null);

  // Technology stack data
  const technologies = [
    'MongoDB', 'Pathway RAG', 'FastAPI', 'Python', 'Next.js', 
    'Mapbox', 'YOLOv8', 'UNet', 'Flutter', 'Docker', 
    'AWS', 'GCP', 'Prometheus', 'Grafana'
  ];

  // Team members data
  const teamMembers = [
    { name: 'Abhineet', role: 'Backend Developer' },
    { name: 'Khushi', role: 'Frontend Developer' },
    { name: 'Suryansh', role: 'Mobile App Developer' },
    { name: 'Riva', role: 'Frontend Developer' },
    { name: 'Akash', role: 'Machine Learning Engineer' }
  ];

  // Workflow steps
  const workflowSteps = [
    {
      title: 'Crowd-Sourced Data',
      icon: '📱',
      detail: 'Users capture images/video, which are geo-tagged and instantly routed to the backend via FastAPI.'
    },
    {
      title: 'YOLOv8 Identification',
      icon: '🤖',
      detail: 'The system uses YOLOv8 for rapid object detection and UNet for satellite image change tracking.'
    },
    {
      title: 'Contextual Intelligence',
      icon: '🗄️',
      detail: 'MongoDB stores geo-spatial data, and Pathway RAG provides real-time, context-aware threat assessment to the Admin Panel.'
    },
    {
      title: 'Real-time Visualization',
      icon: '⚡',
      detail: 'Next.js and Mapbox visualize threat locations, speed, and trajectory, generating immediate alerts.'
    }
  ];

  useEffect(() => {
    // Hero animations with SplitText
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    const heroTitle = heroRef.current.querySelector('h1');
    const splitTitle = new SplitText(heroTitle, { type: 'chars' });
    
    heroTimeline
      .set(heroTitle, { opacity: 1 })
      .from(splitTitle.chars, {
        opacity: 0,
        scale: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)'
      })
      .from(problemTextRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1
      }, '-=0.5');

    // Workflow card animations
    workflowSteps.forEach((_, index) => {
      const card = document.querySelector(`[data-workflow="${index}"]`);
      
      // Initial animation on scroll
      gsap.from(card, {
        scrollTrigger: {
          trigger: workflowRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.2
      });

      // Hover animations for workflow cards
      const cardFront = card.querySelector('.card-front');
      const cardBack = card.querySelector('.card-back');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(cardFront, {
          rotateY: 180,
          duration: 0.6,
          ease: 'power2.inOut'
        });
        gsap.to(cardBack, {
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(cardFront, {
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        });
        gsap.to(cardBack, {
          rotateY: -180,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      });
    });

    // Team cards animation with enhanced 3D effect
    gsap.from('[data-team-card]', {
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Add hover animations for team cards
    document.querySelectorAll('[data-team-card]').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 10,
          duration: 0.4,
          ease: 'power2.out',
          boxShadow: '0 20px 40px rgba(0,170,255,0.3)'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: 'power2.out',
          boxShadow: '0 6px 30px rgba(0,170,255,0.12)'
        });
      });
    });

    // Tech stack infinite scroll with smooth pause
    const techScroller = gsap.to(techScrollerRef.current, {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1
    });

    // Smooth pause/play for tech scroll
    techScrollerRef.current.addEventListener('mouseenter', () => {
      gsap.to(techScroller, {
        timeScale: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    techScrollerRef.current.addEventListener('mouseleave', () => {
      gsap.to(techScroller, {
        timeScale: 1,
        duration: 0.5,
        ease: 'power2.in'
      });
    });

    // Enhanced CTA button animation
    gsap.to(ctaRef.current, {
      boxShadow: '0 0 30px #ff5e00',
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      splitTitle.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-black to-black pointer-events-none" />
        
        {/* Grid overlay effect (rendered via safe inline style to avoid JSX parsing issues) */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.5 0H0V1.5M28.5 0H30V1.5M1.5 30H0V28.5M28.5 30H30V28.5' stroke='rgba(255,255,255,0.1)'/></svg>")`,
            backgroundRepeat: 'repeat'
          }}
        />
        
        <div className="container mx-auto max-w-6xl">
          <div ref={heroRef} className="text-center mb-12">
            <h1 className="opacity-0 text-5xl md:text-7xl font-bold mb-8 text-white">
              AstraNet: The AI-Powered Early Warning Network
            </h1>
            <div ref={problemTextRef} className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl">
              <p className="font-medium text-white/90">Current defense systems are overwhelmed by cheap, numerous drones.</p>
              <p className="font-medium text-white/90">Traditional radar infrastructures are expensive, sparse, and create dangerous detection gaps that can be exploited by small aerial threats.</p>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mt-12 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="bg-zinc-900 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stats Panel */}
                <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">Active Threats</h3>
                  <div className="text-3xl font-bold text-white">24</div>
                  <p className="text-white/60 text-sm">Last 24 hours</p>
                </div>
                {/* Coverage Map */}
                <div className="bg-black/50 rounded-lg p-4 border border-white/10 md:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-2">Coverage Map</h3>
                  <div className="aspect-video bg-zinc-800 rounded-lg 
                                border border-white/5 relative overflow-hidden">
                    {/* Map Overlay */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 0V20M0 10H20' stroke='rgba(255,255,255,0.1)'/></svg>")`,
                        backgroundRepeat: 'repeat'
                      }}
                    />
                    {/* Radar Sweep Animation */}
                    <div className="absolute inset-0 origin-center animate-[spin_4s_linear_infinite] bg-gradient-conic from-white/5 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section ref={workflowRef} className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            How It Works: Real-time Threat Correlation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
                <div
                  key={step.title}
                  data-workflow={index}
                  className="relative h-80 perspective-[1000px] group cursor-pointer"
                >
                  <div className="card-front absolute inset-0 p-6 rounded-lg bg-zinc-900/80 
                                backdrop-blur-sm
                                border border-white/20 
                                shadow-[0_0_30px_rgba(255,255,255,0.05)]
                                transform-gpu backface-hidden transition-all duration-500
                                group-hover:border-white/40"
                  >
                    <div className="text-5xl mb-6">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <div className="text-white/60 text-sm">Hover to learn more</div>
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                                  bg-gradient-to-br from-white/10 to-transparent 
                                  transition-opacity duration-300" />
                  </div>
                  <div className="card-back absolute inset-0 p-6 rounded-lg bg-zinc-900/80 
                                backdrop-blur-sm
                                border border-white/20
                                shadow-[0_0_30px_rgba(255,255,255,0.05)]
                                transform-gpu rotateY-180 backface-hidden transition-all duration-500"
                  >
                    <div className="h-full flex flex-col justify-center">
                      <p className="text-white/90 font-medium leading-relaxed text-lg">
                        {step.detail}
                      </p>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Meet Team Aetherflux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                data-team-card
                className="group relative p-8 rounded-lg bg-zinc-900 
                         border border-white/10
                         shadow-[0_10px_40px_rgba(255,255,255,0.05)]
                         transition-all duration-500 ease-out
                         transform-gpu hover:-translate-y-2 hover:rotate-2
                         hover:border-white/20
                         hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)]"
              >
                <div className="w-28 h-28 mx-auto mb-6 rounded-full 
                              bg-gradient-to-br from-white/10 to-white/5
                              border-2 border-white/20
                              shadow-[0_0_30px_rgba(255,255,255,0.1)]
                              group-hover:border-white/30
                              group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]
                              transition-all duration-500" />
                <h3 className="text-2xl font-bold mb-3 text-center text-white">{member.name}</h3>
                <p className="text-gray-200 text-center font-medium">{member.role}</p>
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                              bg-gradient-to-br from-white/5 to-transparent 
                              transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-zinc-950 overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Tech Arsenal</h2>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10" />
          <div
            ref={techScrollerRef}
            className="flex gap-8 whitespace-nowrap py-8 relative"
          >
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={index}
                className="inline-block px-6 py-3 text-white font-medium
                         hover:text-white transition-all duration-300
                         drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]
                         hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]
                         hover:bg-white/5 rounded-lg"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-white">Ready to See AstraNet in Action?</h2>
          <button
            ref={ctaRef}
            className="px-10 py-5 bg-white text-black rounded-lg text-xl font-bold
                     shadow-[0_0_30px_rgba(255,255,255,0.2)]
                     hover:bg-gray-100 
                     hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
                     transition-all duration-300
                     transform hover:scale-105"
          >
            See the Live Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default AstraNetAbout;