import { useEffect, useRef } from 'react';
import { siteContent } from '../content';

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const { words } = siteContent.marquee;
  const repeatedWords = [...words, ...words, ...words, ...words, ...words];

  useEffect(() => {
    let animationFrameId: number;
    let currentScrollY = window.scrollY;
    let targetOffset = 0;

    const onScroll = () => {
      currentScrollY = window.scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const update = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const calcOffset = (currentScrollY - sectionTop + window.innerHeight) * 0.4;
        targetOffset += (calcOffset - targetOffset) * 0.1;

        if (row1Ref.current) {
          row1Ref.current.style.transform = `translate3d(${targetOffset - 1000}px, 0, 0)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translate3d(${-(targetOffset - 1000)}px, 0, 0)`;
        }
      }
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-2 sm:gap-6"
    >
      <div
        ref={row1Ref}
        className="flex gap-8 w-max items-center"
        style={{ willChange: 'transform' }}
      >
        {repeatedWords.map((word, idx) => (
          <div key={`row1-${idx}`} className="flex items-center gap-8">
            <span 
              className="text-transparent font-black uppercase text-[60px] sm:text-[100px] md:text-[140px] leading-none whitespace-nowrap"
              style={{ fontFamily: "'Archivo Black', sans-serif", WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}
            >
              {word}
            </span>
            <span className="text-white/20 text-4xl">✦</span>
          </div>
        ))}
      </div>
      <div
        ref={row2Ref}
        className="flex gap-8 w-max items-center"
        style={{ willChange: 'transform' }}
      >
        {repeatedWords.slice().reverse().map((word, idx) => (
          <div key={`row2-${idx}`} className="flex items-center gap-8">
            <span 
              className="text-white font-black uppercase text-[60px] sm:text-[100px] md:text-[140px] leading-none whitespace-nowrap"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              {word}
            </span>
            <span className="text-white/20 text-4xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};
