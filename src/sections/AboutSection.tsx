import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { siteContent } from '../content';
import gsap from 'gsap';

export const AboutSection = () => {
  const { heading, text, decorativeImages } = siteContent.about;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax on decorative images
  const decoY1 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const decoY2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  // GSAP text shimmer on heading
  useEffect(() => {
    if (!headingRef.current) return;
    gsap.to(headingRef.current, {
      textShadow: '8px 8px 0px #306230, 0 0 20px rgba(139,172,15,0.3)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden bg-[#9bbc0f]"
    >
      {/* ── Top separator ────────── */}
      <div className="absolute top-0 left-0 right-0 gb-section-separator" />

      {/* ── Parallax Decorative Corner Images ── */}
      <motion.div style={{ y: decoY1 }} className="absolute top-[6%] left-[2%] sm:left-[3%] md:left-[5%] w-[70px] sm:w-[100px] md:w-[140px]">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img src={decorativeImages.topLeft} alt="Deco" className="w-full h-auto object-contain opacity-40" style={{ filter: 'sepia(1) saturate(3) hue-rotate(60deg) brightness(0.6)' }} />
        </FadeIn>
      </motion.div>

      <motion.div style={{ y: decoY2 }} className="absolute bottom-[6%] left-[3%] sm:left-[6%] md:left-[10%] w-[70px] sm:w-[100px] md:w-[140px]">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img src={decorativeImages.bottomLeft} alt="Deco" className="w-full h-auto object-contain opacity-40" style={{ filter: 'sepia(1) saturate(3) hue-rotate(60deg) brightness(0.6)' }} />
        </FadeIn>
      </motion.div>

      <motion.div style={{ y: decoY1 }} className="absolute top-[6%] right-[2%] sm:right-[3%] md:right-[5%] w-[70px] sm:w-[100px] md:w-[140px]">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img src={decorativeImages.topRight} alt="Deco" className="w-full h-auto object-contain opacity-40" style={{ filter: 'sepia(1) saturate(3) hue-rotate(60deg) brightness(0.6)' }} />
        </FadeIn>
      </motion.div>

      <motion.div style={{ y: decoY2 }} className="absolute bottom-[6%] right-[3%] sm:right-[6%] md:right-[10%] w-[70px] sm:w-[100px] md:w-[140px]">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img src={decorativeImages.bottomRight} alt="Deco" className="w-full h-auto object-contain opacity-40" style={{ filter: 'sepia(1) saturate(3) hue-rotate(60deg) brightness(0.6)' }} />
        </FadeIn>
      </motion.div>

      {/* ── Content ──────────────── */}
      <div className="flex flex-col items-center text-center z-10 w-full max-w-3xl">
        <FadeIn delay={0} y={40}>
          <p className="font-pixel-mono text-[#306230] text-base sm:text-xl mb-4">&gt; PLAYER INFO</p>
          <h2
            ref={headingRef}
            className="gb-heading uppercase leading-none tracking-tight text-[clamp(1.5rem,5vw,56px)]"
          >
            {heading}
          </h2>
        </FadeIn>

        {/* ── Pixel divider ──────── */}
        <div className="w-32 sm:w-48 my-8 sm:my-12">
          <div className="pixel-divider" />
        </div>

        <div className="pixel-border bg-[#8bac0f] p-5 sm:p-8 md:p-10 max-w-xl">
          <AnimatedText
            text={text}
            className="text-[#0f380f] font-pixel-body leading-[2] sm:leading-[2.2] text-[clamp(0.7rem,1.4vw,0.95rem)] uppercase"
          />
        </div>
      </div>

      {/* ── Scanlines overlay ────── */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(15,56,15,0.08) 2px, rgba(15,56,15,0.08) 4px)',
        }}
      />
    </section>
  );
};
