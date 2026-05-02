import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TechSection } from './sections/TechSection';
import { ContactSection } from './sections/ContactSection';

function App() {
  return (
    <main className="min-h-screen" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ProjectsSection />
      <TechSection />
      <ContactSection />
    </main>
  );
}

export default App;
