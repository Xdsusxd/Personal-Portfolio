import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { siteContent } from '../content';
import * as THREE from 'three';

// ── Wireframe shape component ────────────────────────────
type GeoType = 'box' | 'sphere' | 'tetra' | 'octa' | 'cone';

function WireShape({ position, speed, size, geoType }: {
  position: [number, number, number];
  speed: number;
  size: number;
  geoType: GeoType;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
  });

  const geometry = useMemo(() => {
    switch (geoType) {
      case 'box': return <boxGeometry args={[size, size, size]} />;
      case 'sphere': return <icosahedronGeometry args={[size, 1]} />;
      case 'tetra': return <tetrahedronGeometry args={[size, 0]} />;
      case 'octa': return <octahedronGeometry args={[size, 0]} />;
      case 'cone': return <coneGeometry args={[size * 0.6, size * 1.2, 4]} />;
      default: return <boxGeometry args={[size, size, size]} />;
    }
  }, [geoType, size]);

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.35} transparent />
      </mesh>
    </Float>
  );
}

// ── Scene with wireframe shapes ──────────────────────────
function Scene() {
  const shapes = useMemo(() => [
    { position: [-4, 2.5, -3] as [number, number, number], speed: 0.8, size: 0.9, geoType: 'box' as GeoType },
    { position: [4, -1.5, -4] as [number, number, number], speed: 0.6, size: 1.1, geoType: 'sphere' as GeoType },
    { position: [-2, -2.5, -2] as [number, number, number], speed: 1.2, size: 0.7, geoType: 'tetra' as GeoType },
    { position: [3, 2, -3] as [number, number, number], speed: 0.9, size: 0.8, geoType: 'octa' as GeoType },
    { position: [0, 0.5, -5] as [number, number, number], speed: 0.5, size: 1.3, geoType: 'cone' as GeoType },
    { position: [-3.5, -0.5, -3.5] as [number, number, number], speed: 1.0, size: 0.6, geoType: 'box' as GeoType },
    { position: [2, -3, -2] as [number, number, number], speed: 0.7, size: 0.5, geoType: 'tetra' as GeoType },
    { position: [-1, 3, -4] as [number, number, number], speed: 0.4, size: 0.8, geoType: 'sphere' as GeoType },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      {shapes.map((s, i) => (
        <WireShape key={i} {...s} />
      ))}
    </>
  );
}

// ── Project Card (Image-less, purely typographic & glassmorphic) ──
function ProjectCard({ project, index }: {
  project: typeof siteContent.projects.items[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="group relative rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between h-[320px] sm:h-[380px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Dynamic glow based on project color */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: project.color }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium" style={{ color: project.color, fontFamily: "'Kanit', sans-serif" }}>
            {project.category}
          </span>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-300">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </div>

        <div>
          <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-none tracking-tight group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            {project.title}
          </h3>
          <p className="text-[#D7E2EA]/70 text-sm md:text-base leading-relaxed line-clamp-3" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {project.description}
          </p>
        </div>
      </div>

      {/* Big Watermark Number */}
      <div className="absolute -bottom-4 right-4 sm:right-6 text-[100px] sm:text-[140px] font-black opacity-[0.03] leading-none pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.08]" style={{ fontFamily: "'Archivo Black', sans-serif", color: project.color }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
}

// ── Main Section ─────────────────────────────────────────
export const ProjectsSection = () => {
  const { heading, items } = siteContent.projects;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const canvasOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-[#0C0C0C] py-24 sm:py-32 md:py-40 min-h-screen">
      {/* ── 3D Canvas — wireframe shapes ── */}
      <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </motion.div>

      {/* ── Content ────────────────────── */}
      <div className="relative z-10 px-5 sm:px-8 md:px-10 max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,10vw,120px)] leading-none mb-6" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {heading}
          </h2>
          <p className="text-center text-[#D7E2EA]/40 text-sm md:text-base uppercase tracking-widest mb-16 sm:mb-24" style={{ fontFamily: "'Kanit', sans-serif" }}>
            Trabajos destacados
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {items.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-white opacity-[0.02] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-white opacity-[0.02] blur-[120px]" />
      </div>
    </section>
  );
};
