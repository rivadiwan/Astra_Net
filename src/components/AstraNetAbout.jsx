import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import avatarAbhineet from "../assets/avatar-abhineet.png.png";
import avatarKhushi from "../assets/avatar-khushi.png.png";
import avatarSuryansh from "../assets/avatar-suryansh.png.png";
import avatarRiva from "../assets/avatar-riva.png.png";
import avatarAkash from "../assets/avatar-akash.png.png";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const AstraNetAbout = () => {
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const underlineRef = useRef(null);
  const descriptionRef = useRef(null);
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
    { name: "Abhineet", role: "Machine Learning Engineer", avatarUrl: avatarAbhineet },
    { name: "Khushi", role: "Frontend Developer", avatarUrl: avatarKhushi },
    { name: "Suryansh", role: "Mobile App Developer", avatarUrl: avatarSuryansh },
    { name: "Riva", role: "Frontend Developer", avatarUrl: avatarRiva },
    { name: "Akash", role: "Backend Developer", avatarUrl: avatarAkash }
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
      // Animate the glowing underline
      .to(underlineRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.2')
      // Animate the main description
      .fromTo(descriptionRef.current, 
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        },
        '-=0.4'
      );

    // Workflow card animations
    // Make sure workflow cards are visible by default (prevent being hidden before ScrollTrigger fires)
    const workflowCards = document.querySelectorAll('[data-workflow]');
    if (workflowCards.length) {
      gsap.set(workflowCards, { opacity: 1, y: 0 });
    }

    workflowSteps.forEach((_, index) => {
      const card = document.querySelector(`[data-workflow="${index}"]`);

      // Scroll-triggered reveal (don't let immediateRender hide elements)
      gsap.from(card, {
        scrollTrigger: {
          trigger: workflowRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.2,
        immediateRender: false
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

    // Ensure team cards are visible by default
    const teamCards = document.querySelectorAll('[data-team-card]');
    if (teamCards.length) {
      gsap.set(teamCards, { opacity: 1, y: 0 });
    }

    // Team cards animation with enhanced 3D effect (scroll reveal)
    gsap.from('[data-team-card]', {
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top bottom',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      immediateRender: false
    });

    // Add hover animations for team cards
    document.querySelectorAll('[data-team-card]').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          rotateX: 5,
          rotateY: 5,
          duration: 0.4,
          ease: 'power2.out',
          boxShadow: '0 25px 50px rgba(0,170,255,0.15)'
        });

        // Enhance image glow on hover
        const imageContainer = card.querySelector('img').parentElement;
        gsap.to(imageContainer, {
          boxShadow: '0 0 35px #00aaff',
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out',
          boxShadow: '0 15px 35px rgba(0,170,255,0.1)'
        });

        // Reset image glow
        const imageContainer = card.querySelector('img').parentElement;
        gsap.to(imageContainer, {
          boxShadow: '0 0 25px #00aaff',
          duration: 0.4,
          ease: 'power2.out'
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
            <h1 className="opacity-0 text-5xl md:text-7xl font-bold mb-4 text-white">
              AstraNet: The AI-Powered Early Warning Network
            </h1>
            
            {/* Glowing underline */}
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full opacity-0" ref={underlineRef}></div>
            
            {/* Main description */}
            <p className="opacity-0 text-lg md:text-xl text-white/80 max-w-3xl mx-auto mt-6 leading-relaxed" ref={descriptionRef}>
              AstraNet is an AI-powered defense intelligence network designed to detect, classify, and neutralize rogue aerial threats in real time. By integrating citizen-sourced data, advanced computer vision models, and real-time analytics, AstraNet transforms how defense ecosystems perceive and respond to low-cost, fast-moving drone incursions. It bridges the gap between detection and decision-making — turning raw sensor input into actionable intelligence for rapid threat response.
            </p>
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
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="card-front absolute inset-0 p-6 rounded-lg bg-zinc-900/80 
                                backdrop-blur-sm
                                border border-white/20 
                                shadow-[0_0_30px_rgba(255,255,255,0.05)]
                                transform-gpu transition-all duration-500
                                group-hover:border-white/40"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div className="text-5xl mb-6">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-left" dir="ltr">{step.title}</h3>
                    <div className="text-white/60 text-sm text-left" dir="ltr">Hover to learn more</div>
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                                  bg-gradient-to-br from-white/10 to-transparent 
                                  transition-opacity duration-300" />
                  </div>
                  <div
                    className="card-back absolute inset-0 p-6 rounded-lg bg-zinc-900/80 
                                backdrop-blur-sm
                                border border-white/20
                                shadow-[0_0_30px_rgba(255,255,255,0.05)]
                                transform-gpu transition-all duration-500"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div className="h-full flex flex-col justify-center text-left" dir="ltr">
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
      <section ref={teamRef} className="py-20 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Meet Team Aetherflux</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6">Elite professionals pioneering the future of aerial threat detection and response</p>
            <div className="flex justify-center gap-2 mb-8">
              <span className="px-4 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-sm text-zinc-300">5 Core Members</span>
              <span className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400">Specialized Team</span>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                data-team-card
                className="group relative p-6 rounded-xl bg-zinc-900/80 
                         backdrop-blur-sm
                         border border-zinc-800
                         shadow-lg
                         transition-all duration-300 ease-out
                         transform-gpu hover:-translate-y-1
                         hover:border-zinc-700
                         hover:shadow-xl
                         flex flex-col items-center
                         w-full max-w-sm mx-auto"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <div className="relative mb-6 flex justify-center items-center">
                  <div
                    className="w-24 h-24 rounded-full overflow-hidden transform-gpu relative"
                    style={{
                      boxShadow: '0 0 25px #00aaff',
                      transform: 'translateZ(50px)'
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-blue-500/20 to-blue-500/10">
                      <img
                        src={member.avatarUrl}
                        alt={`${member.name}`}
                        className="w-24 h-24 rounded-full object-cover transform-gpu transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                        style={{
                          filter: 'brightness(1.05) contrast(1.05)',
                          imageRendering: 'high-quality'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-center text-white">{member.name}</h3>
                <p className="text-blue-400 text-sm font-medium mb-4">{member.role}</p>

                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
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