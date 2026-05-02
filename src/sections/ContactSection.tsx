import { FadeIn } from '../components/FadeIn';
import { siteContent } from '../content';
import { Mail, ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.11 7.47-1.93 1.9-4.7 2.82-7.39 2.53-2.61-.25-5.07-1.42-6.73-3.41-1.63-1.92-2.39-4.52-2.12-7.06.27-2.6 1.48-5 3.42-6.66 1.88-1.61 4.41-2.43 6.85-2.17v4.06c-1.18-.08-2.38.16-3.39.73-.97.55-1.74 1.4-2.12 2.45-.37 1.05-.39 2.22-.05 3.25.32 1 1.05 1.84 1.94 2.3.89.47 1.95.59 2.94.34.98-.24 1.84-.86 2.37-1.7.53-.83.74-1.85.73-2.84-.03-4.7-.01-9.4-.01-14.1z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const iconMap: Record<string, React.FC<any>> = {
  Github: GithubIcon,
  Instagram: InstagramIcon,
  Tiktok: TiktokIcon,
  Twitter: TwitterIcon,
  Mail,
};

export const ContactSection = () => {
  const { heading, description, socials, email } = siteContent.contact;

  return (
    <section id="contact" className="bg-[#0C0C0C] relative py-20 sm:py-32 px-5 sm:px-8 md:px-10 overflow-hidden text-[#D7E2EA]">
      {/* ── Top border separator ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0} y={30}>
          <h2 className="font-black uppercase tracking-tight text-white text-[clamp(2.5rem,6vw,80px)] leading-none mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            {heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <p className="text-lg sm:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-12" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {description}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <a
            href={`mailto:${email}`}
            className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#D7E2EA] transition-colors duration-300"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            {email}
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </FadeIn>

        <div className="w-full h-[1px] bg-white/10 my-16" />

        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6">
          <p className="text-sm text-white/40 uppercase tracking-widest" style={{ fontFamily: "'Kanit', sans-serif" }}>
            © {new Date().getFullYear()} Antonio Picazo. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            {socials.map((social) => {
              const Icon = iconMap[social.icon] || Mail;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
