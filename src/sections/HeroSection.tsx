import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { siteContent } from '../content';

export const HeroSection = () => {
  const { navLinks, heading, subheading, portraitImage } = siteContent.hero;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headingScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const words = heading.split(' ');

  return (
    <section ref={sectionRef} className="h-screen flex flex-col overflow-hidden relative bg-[#0C0C0C]">
      
      <motion.nav
        style={{ opacity: navOpacity }}
        className="flex justify-between text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] px-6 md:px-10 pt-6 md:pt-8 relative z-30"
      >
        {navLinks.map((link, i) => (
          <FadeIn key={link.label} delay={i * 0.08} y={-20}>
            <a href={link.href} className="hover:opacity-70 transition-opacity duration-200" style={{ fontFamily: "'Kanit', sans-serif" }}>
              {link.label}
            </a>
          </FadeIn>
        ))}
      </motion.nav>

      <div className="flex-1 flex flex-col justify-center relative z-20 pointer-events-none">
        <motion.div style={{ scale: headingScale, opacity: headingOpacity }} className="w-full text-center px-4">
          <div>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block font-black uppercase tracking-tight text-white"
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: words.length > 1 ? 'clamp(3rem, 11vw, 200px)' : 'clamp(3rem, 15vw, 240px)',
                  lineHeight: 0.9,
                  marginRight: i < words.length - 1 ? '0.3em' : 0,
                  textShadow: '0px 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-30">
        <FadeIn delay={0.5} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[200px] sm:max-w-[260px] md:max-w-[320px]" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {subheading}
          </p>
        </FadeIn>

        <FadeIn delay={0.6} y={20}>
          <div className="text-[#D7E2EA] opacity-50 text-xs md:text-sm uppercase tracking-widest animate-bounce" style={{ fontFamily: "'Kanit', sans-serif" }}>
            ↓ Scroll
          </div>
        </FadeIn>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-[25] pointer-events-none">
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          className="w-[200px] sm:w-[280px] md:w-[340px] lg:w-[400px] pointer-events-none"
        >
          <img
            src={portraitImage}
            alt="Antonio Picazo"
            className="w-full h-auto object-contain select-none"
            draggable={false}
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#646973] opacity-[0.04] blur-[120px]" />
      </div>
    </section>
  );
};
