import { useRef, useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';
import { siteContent } from '../content';
import anime from 'animejs';

// Devicon CDN — tries -original first, then -plain on error
const getDevIconUrl = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;

// Some techs only have -plain variant, provide explicit map
const ICON_OVERRIDES: Record<string, string> = {
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  django: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
  unity: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  astro: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg',
  vulkan: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Vulkan.svg',
  opencv: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
  rust: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
  jupyter: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-plain.svg',
  kalilinux: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg',
};

const getIcon = (slug: string) => ICON_OVERRIDES[slug] || getDevIconUrl(slug);

export const TechSection = () => {
  const { heading, description, items } = siteContent.technologies;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.tech-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              translateY: [40, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              delay: anime.stagger(60),
              duration: 800,
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tech" className="bg-white relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-28 md:py-36">
      <div className="absolute top-0 left-0 right-0 h-2 bg-black" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <FadeIn delay={0} y={40}>
          <p className="font-pixel-mono text-neutral-400 text-lg sm:text-2xl mb-4 text-center uppercase">&gt; INVENTORY</p>
          <h2 className="font-pixel-title text-black uppercase text-center text-[clamp(1.2rem,4vw,40px)] mb-6 sm:mb-8 leading-relaxed" style={{ textShadow: '3px 3px 0px #d4d4d4' }}>
            {heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={30} className="w-full max-w-3xl text-center mb-14 sm:mb-20">
          <p className="font-pixel-body text-neutral-500 leading-relaxed text-xs sm:text-sm md:text-base uppercase">
            {description}
          </p>
        </FadeIn>

        <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
          {items.map((tech) => (
            <div
              key={tech.name}
              className="tech-card bg-white border-3 border-black p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3 cursor-default transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#000] opacity-0"
              style={{ boxShadow: '3px 3px 0px #000' }}
            >
              {/* ── Icon ── */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1">
                <img
                  src={getIcon(tech.iconSlug)}
                  alt={`${tech.name} logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('-original.svg')) {
                      target.src = target.src.replace('-original.svg', '-plain.svg');
                    }
                  }}
                />
              </div>

              {/* ── Name ── */}
              <h3 className="font-pixel-title text-black uppercase text-[0.45rem] sm:text-[0.5rem] leading-relaxed">
                {tech.name}
              </h3>

              {/* ── Description ── */}
              <p className="font-pixel-mono text-neutral-400 text-[10px] sm:text-xs uppercase leading-relaxed hidden sm:block">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        <FadeIn delay={0.5} y={15} className="mt-12 sm:mt-16 text-center">
          <div className="inline-block border-4 border-black bg-black px-5 py-3" style={{ boxShadow: '4px 4px 0px #666' }}>
            <p className="font-pixel-mono text-white text-xs sm:text-sm uppercase">
              &gt; {items.length} TOOLS EQUIPPED _
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
