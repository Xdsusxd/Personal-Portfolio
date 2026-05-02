import { useEffect, useRef } from 'react';
import { siteContent } from '../content';

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const { images } = siteContent.marquee;
  const row1Images = [...images.slice(0, 11), ...images.slice(0, 11), ...images.slice(0, 11)];
  const row2Images = [...images.slice(11), ...images.slice(11), ...images.slice(11)];

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
        const calcOffset = (currentScrollY - sectionTop + window.innerHeight) * 0.3;
        targetOffset += (calcOffset - targetOffset) * 0.1;

        if (row1Ref.current) {
          row1Ref.current.style.transform = `translate3d(${targetOffset - 200}px, 0, 0)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translate3d(${-(targetOffset - 200)}px, 0, 0)`;
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
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3"
    >
      <div
        ref={row1Ref}
        className="flex gap-3 w-max"
        style={{ willChange: 'transform' }}
      >
        {row1Images.map((src, idx) => (
          <img
            key={`row1-${idx}`}
            src={src}
            loading="lazy"
            alt="Work preview"
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0"
          />
        ))}
      </div>
      <div
        ref={row2Ref}
        className="flex gap-3 w-max"
        style={{ willChange: 'transform' }}
      >
        {row2Images.map((src, idx) => (
          <img
            key={`row2-${idx}`}
            src={src}
            loading="lazy"
            alt="Work preview"
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0"
          />
        ))}
      </div>
    </section>
  );
};
