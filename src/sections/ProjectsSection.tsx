import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { siteContent } from '../content';
import * as THREE from 'three';

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

function ProjectRow({ project, index }: {
  project: typeof siteContent.projects.items[0];
  index: number;
}) {
  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      className="group relative border-b border-white/10 first:border-t py-10 md:py-16 cursor-pointer overflow-hidden"
    >
      
      <motion.div 
        variants={{
          initial: { height: '0%' },
          hover: { height: '100%' }
        }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="absolute bottom-0 left-0 w-full bg-[#D7E2EA] z-0 origin-bottom"
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center px-4 md:px-10 max-w-7xl mx-auto">

        <div className="md:col-span-2">
          <span className="text-white/40 font-mono text-lg md:text-xl group-hover:text-black/40 transition-colors duration-300">
            0{index + 1} 
          </span>
        </div>

        <div className="md:col-span-6">
          <motion.h3 
            variants={{
              initial: { x: 0 },
              hover: { x: 24 }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter group-hover:text-black transition-colors duration-300" 
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            {project.title}
          </motion.h3>
        </div>

        <div className="md:col-span-4 flex flex-col items-start md:items-end text-left md:text-right">
          <span 
            className="text-xs md:text-sm uppercase tracking-widest font-bold mb-3 transition-colors duration-300" 
            style={{ color: project.color, fontFamily: "'Kanit', sans-serif" }}
          >
            {project.category}
          </span>
          <p className="text-white/50 text-sm group-hover:text-black/70 transition-colors duration-300 max-w-xs" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {project.description}
          </p>
        </div>
        
      </div>
    </motion.div>
  );
}

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

      <div className="relative z-10 px-5 sm:px-8 md:px-10 max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,10vw,120px)] leading-none mb-6" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {heading}
          </h2>
          <p className="text-center text-[#D7E2EA]/40 text-sm md:text-base uppercase tracking-widest mb-16 sm:mb-24" style={{ fontFamily: "'Kanit', sans-serif" }}>
            Trabajos destacados
          </p>
        </FadeIn>

        <div className="flex flex-col w-full">
          {items.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
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
