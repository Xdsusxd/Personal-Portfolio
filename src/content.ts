// ══════════════════════════════════════════════════════════════
// CONTENT FILE — Edita SOLO este archivo para cambiar textos,
// imágenes y datos del sitio.
// ══════════════════════════════════════════════════════════════

export const siteContent = {
  global: {
    title: "Kar AP Portfolio",
  },

  hero: {
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Tech", href: "#tech" },
    ],
    heading: "Antonio Picazo",
    subheading: "KarAP | Ex Productor musical y actual Programador",
    // ↓ Retrato/avatar PNG con fondo transparente, mín 520×800 px
    portraitImage: "/images/hero.webp",
  },

  marquee: {
    // ↓ GIFs o WebP animados, landscape 420×270 px recomendado
    images: [
      "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
      "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
      "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
      "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
      "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
      "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
      "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
      "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
      "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
      "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
      "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
      "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
      "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
      "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
      "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
      "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
      "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
      "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
      "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
      "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
      "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
    ]
  },

  about: {
    heading: "About me",
    text: "Programador desde hace 4 años, deje la produccion musical y empeze a aprender sobre ciberseguridad, ia, robotica y programacion",
    decorativeImages: {
      // ↓ Íconos/sprites decorativos, PNG transparente ~210×210 px
      topLeft: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
      bottomLeft: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
      topRight: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
      bottomRight: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
    }
  },

  projects: {
    heading: "Projects",
    items: [
      {
        title: "Stellar Voyage",
        category: "Web 3D",
        description: "Experiencia inmersiva espacial con shaders personalizados y navegación orbital.",
        // ↓ Screenshot/preview del proyecto, landscape 640×400 px
        image: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
        color: "#6366f1",
      },
      {
        title: "Nexora Platform",
        category: "Motion Design",
        description: "Dashboard interactivo con animaciones fluidas y visualización de datos en tiempo real.",
        image: "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
        color: "#ec4899",
      },
      {
        title: "Aethera Studio",
        category: "Branding 3D",
        description: "Identidad visual completa con elementos 3D generativos y assets animados.",
        image: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
        color: "#14b8a6",
      },
      {
        title: "Carpinteria-Website",
        category: "Web",
        description: "Pagina Web de Carpinteria con Seo y Diseño Premium.",
        image: "/videos/carpinteria.webm",
        color: "#f97316",
      },
    ]
  },

  technologies: {
    heading: "Tech Stack",
    description: "Herramientas con las que he trabajado en mis proyectos.",
    items: [
      { name: "Python", description: "Scripts & Data", iconSlug: "python" },
      { name: "React", description: "UI Framework", iconSlug: "react" },
      { name: "HTML", description: "Markup", iconSlug: "html5" },
      { name: "CSS", description: "Styling", iconSlug: "css3" },
      { name: "GitHub", description: "Code Hosting", iconSlug: "github" },
      { name: "Git", description: "Version Control", iconSlug: "git" },
      { name: "Next.js", description: "React Framework", iconSlug: "nextjs" },
      { name: "PostgreSQL", description: "Relational DB", iconSlug: "postgresql" },
      { name: "MySQL", description: "Databases", iconSlug: "mysql" },
      { name: "MongoDB", description: "NoSQL DB", iconSlug: "mongodb" },
      { name: "NumPy", description: "Data Science", iconSlug: "numpy" },
      { name: "Jupyter", description: "Notebooks", iconSlug: "jupyter" },
      { name: "Django", description: "Python Web", iconSlug: "django" },
      { name: "C++", description: "Systems/Games", iconSlug: "cplusplus" },
      { name: "C#", description: "Games & Apps", iconSlug: "csharp" },
      { name: "C", description: "Systems", iconSlug: "c" },
      { name: "Unity", description: "Game Engine", iconSlug: "unity" },
      { name: "GSAP", description: "Animation", iconSlug: "javascript" },
      { name: "Vulkan", description: "Graphics API", iconSlug: "vulkan" },
      { name: "PyTorch", description: "Machine Learning", iconSlug: "pytorch" },
      { name: "OpenCV", description: "Computer Vision", iconSlug: "opencv" },
      { name: "Pygame", description: "Game Library", iconSlug: "python" },
      { name: "Astro", description: "Web Framework", iconSlug: "astro" },
      { name: "Figma", description: "UI/UX Design", iconSlug: "figma" },
      { name: "TypeScript", description: "Typed JS", iconSlug: "typescript" },
      { name: "JavaScript", description: "Web Logic", iconSlug: "javascript" },
      { name: "Tailwind CSS", description: "CSS Framework", iconSlug: "tailwindcss" },
      { name: "Golang", description: "Backend Services", iconSlug: "go" },
      { name: "Rust", description: "Systems", iconSlug: "rust" },
      { name: "Arduino", description: "Hardware", iconSlug: "arduino" },
      { name: "Kotlin", description: "Mobile/Backend", iconSlug: "kotlin" },
      { name: "Flutter", description: "Cross-Platform", iconSlug: "flutter" },
      { name: "Linux", description: "OS", iconSlug: "linux" },
      { name: "Kali Linux", description: "Security", iconSlug: "kalilinux" },
    ]
  },

  contact: {
    heading: "Contacto",
    description: "Abierto a nuevas oportunidades, proyectos y colaboraciones. Mándame un mensaje.",
    email: "antoniopicazo.ka@gmail.com",
    socials: [
      { name: "GitHub", url: "https://github.com/Xdsusxd", icon: "Github" },
      { name: "Instagram", url: "https://www.instagram.com/kar18_ap/", icon: "Instagram" },
      { name: "TikTok", url: "https://www.tiktok.com/@tfkn1.c", icon: "Tiktok" },
      { name: "Mail", url: "mailto:antoniopicazo.ka@gmail.com", icon: "Mail" }
    ]
  }
};
