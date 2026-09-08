"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, Database, Server, Code, Terminal, Home, ExternalLink, X, Menu, GraduationCap } from 'lucide-react';

// Lightweight scroll reveal component
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once revealed to keep it visible
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element hits the bottom of the viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll listener to toggle the left sidebar
  useEffect(() => {
    const handleScroll = () => {
      // Toggle sidebar after scrolling roughly past the hero section (400px)
      if (window.scrollY > 400) {
        setShowLeftSidebar(true);
      } else {
        setShowLeftSidebar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {

    if (isMobileMenuOpen) {

      document.body.style.overflow = 'hidden';

    } else {

      document.body.style.overflow = 'unset';

    }

  }, [isMobileMenuOpen]);
  
  // Flattened project data for easy filtering
  const projects = [
    {
      title: "PostgreSQL B-Tree Optimization",
      category: "Systems Engineering",
      description: "Optimized B-tree descent and added asynchronous page prefetching in PostgreSQL's storage engine, cutting index-scan latency 15% and I/O wait 20% on multi-GB workloads.",
      tags: ["C", "Docker", "Database Internals"],
      link: "https://github.com/shubh-1912/postgresql-17.4-optimized"
    },
    {
      title: "DuckDB Query Scheduler with Multi-level Feedback Queue",
      category: "Systems Engineering",
      description: "Increased concurrent query throughput 25% on TPC-H SF100 by implementing a multi-level feedback queue scheduler in DuckDB's C++ execution engine, eliminating starvation and cutting p95 latency for short queries from 1,850ms to 240ms.",
      tags: ["C++", "LLDB", "Database Internals"]
    },
    {
      title: "Weenix Operating System",
      category: "Systems Engineering",
      description: "Implemented 20+ POSIX system calls, preemptive scheduling, a virtual file system, and thread synchronization primitives (mutexes, condition variables) in a UNIX-like kernel.",
      tags: ["C", "GDB", "Kernel"]
    },
    {
      title: "KickScout Visual Search",
      category: "AI & Machine Learning",
      description: "Built a zero-shot visual similarity search API over a 44K-item fashion catalog, encoding images into 512-dimensional CLIP embeddings via SentenceTransformers and serving top-k cosine matches through a FastAPI endpoint backed by Neo4j's native HNSW vector index.",
      tags: ["PyTorch", "Neo4j", "FastAPI"],
      link: "https://github.com/shubh-1912/project-kickscout"
    },
    {
      title: "DNA Matching System",
      category: "Systems Engineering",
      description: "Integrated a high-performance system using Hirschberg's algorithm, slashing memory consumption by over 99% for large genomic sequences.",
      tags: ["C++", "Algorithms", "Performance Optimization"]
    },
    {
      title: "Decentralized Voting Platform",
      category: "Full-Stack & Web3",
      description: "Engineered a MERN stack blockchain voting application with a custom NodeJS API to ensure unique, unalterable transactions for simulated users.",
      tags: ["MERN", "NodeJS", "Blockchain", "Web3"]
    },
    {
      title: "Vibelink",
      category: "Full-Stack & Web3",
      description: "Built a social music application utilizing AI algorithms to generate custom playlists based on aggregate group song selections.",
      tags: ["Full-Stack", "AI Integration", "Mobile"]
    },
    {
      title: "Face Mask Detector",
      category: "AI & Machine Learning",
      description: "Developed a CNN-based computer vision solution accurately detecting non-mask wearers with 93% precision, coupled with an automated logging system.",
      tags: ["Python", "CNN", "Computer Vision"]
    },
    {
      title: "IoT Smart Gloves",
      category: "AI & Machine Learning",
      description: "Built a robust gesture recognition algorithm using flex sensors and Arduino, enabling highly accurate sign language-to-speech conversion.",
      tags: ["Arduino", "Hardware Integration", "Algorithms"]
    }
  ];

  const categories = ['All', 'Systems Engineering', 'Full-Stack & Web3', 'AI & Machine Learning'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Terminal },
    { id: 'experience', label: 'Experience', icon: Server },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'expertise', label: 'Expertise', icon: Database },
    { id: 'projects', label: 'Projects', icon: Code },
  ];

  // Smooth scroll handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      const offset = 20;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-zinc-50 relative">
      {/* --- MOBILE EXCLUSIVES --- */}
      
      {/* Floating LinkedIn Button (Mobile) */}
      <a 
        href="https://linkedin.com/in/shubhmishra19" 
        target="_blank" 
        rel="noreferrer"
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#0A66C2] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-[#004182] hover:-translate-y-1 transition-all duration-300"
        aria-label="LinkedIn"
      >
        <Linkedin size={24} />
      </a>

      {/* Hamburger Menu Toggle (Mobile) */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm border border-zinc-200 shadow-sm text-zinc-900 rounded-full flex items-center justify-center z-[60] hover:bg-zinc-100 transition-colors"
        aria-label="Toggle Navigation"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>


      {/* Full-Screen Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-zinc-50/95 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)}
              className="flex items-center gap-4 text-2xl font-bold text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <item.icon size={28} />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* --- DESKTOP EXCLUSIVES --- */}
      {/* FLOATING LEFT CONTACT (Desktop Only) */}
      <aside 
        className={`hidden lg:flex flex-col fixed left-4 xl:left-8 top-1/3 z-50 transition-all duration-500 ${
          showLeftSidebar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm border border-zinc-200 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-5">
          <div className="text-center">
            <p className="font-bold text-zinc-900 leading-tight">Shubh</p>
            <p className="font-bold text-zinc-900 leading-tight">Mishra</p>
          </div>
          <div className="w-8 h-px bg-zinc-200"></div>
          <div className="flex flex-col gap-3">
            <a href="mailto:mishrashubh.1912@gmail.com" className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors" title="Email">
              <Mail size={20} />
            </a>
            <a href="https://linkedin.com/in/shubhmishra19" target="_blank" rel="noreferrer" className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/shubh-1912" target="_blank" rel="noreferrer" className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors" title="GitHub">
              <Github size={20} />
            </a>
          </div>
        </div>
      </aside>

      {/* FLOATING RIGHT NAVIGATION (Desktop Only) */}
      <nav className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 group">
        <div className="bg-white border border-r-0 border-zinc-200 shadow-sm rounded-l-2xl py-3 px-2 transition-all duration-300 w-14 hover:w-40 overflow-hidden flex flex-col gap-2">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)}
              className="flex items-center gap-4 p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors whitespace-nowrap"
            >
              <item.icon size={20} className="shrink-0" />
              <span className="font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="home" className="max-w-4xl mx-auto px-6 py-24 md:py-28">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Shubh Mishra
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 mb-8 max-w-2xl leading-relaxed">
          Software Engineer specializing in backend architecture, database systems, and distributed computing. 
          Currently pursuing an MS in Computer Science at the University of Southern California.
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <a href="mailto:mishrashubh.1912@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors">
            <Mail size={16} /> mishrashubh.1912@gmail.com
          </a>
          <a href="https://linkedin.com/in/shubhmishra19" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-200 text-zinc-900 rounded-full hover:bg-zinc-300 transition-colors">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://github.com/shubh-1912" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-200 text-zinc-900 rounded-full hover:bg-zinc-300 transition-colors">
            <Github size={16} /> GitHub
          </a>
          <div className="flex items-center gap-2 px-4 py-2 text-zinc-600">
            <MapPin size={16} /> Los Angeles, CA
          </div>
        </div>
      </header>

      {/* ABOUT ME */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Terminal size={24}/> About Me</h2>
        <p className="text-zinc-600 leading-relaxed text-lg">
        I build robust, high-performance systems. From shaving milliseconds off API response times at Oracle to diving deep into OS kernels and database micro-optimizations, I thrive on solving complex architectural problems. When I am not working, you can usually find me hiking the trails around LA or experimenting with new recipes in the kitchen.
        </p>
      </section>

      {/* EXPERIENCE */}
      <Reveal>
      <section id="experience" className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Server size={24}/> Experience</h2>
        
        <div className="border-l-2 border-zinc-200 pl-6 pb-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold">Assistant Forward Deployed Engineer</h3>
            <span className="text-zinc-500 text-sm font-mono">Jun 2026 — Aug 2026</span>
          </div>
          <p className="text-zinc-600 font-medium mb-4">USC Hospitality | Los Angeles, CA</p>
          <ul className="list-disc list-inside text-zinc-600 space-y-2">
            <li>Built an internal operations dashboard in Streamlit, fed by a scheduled ETL pipeline processing 100K+ daily point-of-sale transactions, surfacing 10+ aggregate views and replacing 15 hours/week of manual report compilation.</li>
            <li>Deployed and integrated a new dining location&apos;s ordering and live analytics stack, surfacing transaction patterns that drove drink-pairing upsell recommendations and boosted sales 40%.</li>
          </ul>
        </div>

        <div className="border-l-2 border-zinc-200 pl-6 pb-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold">Software Engineer</h3>
            <span className="text-zinc-500 text-sm font-mono">Sep 2024 — May 2025</span>
          </div>
          <p className="text-zinc-600 font-medium mb-4">Oracle | Hyderabad, India</p>
          <ul className="list-disc list-inside text-zinc-600 space-y-2">
            <li>Designed and built a webhook delivery subsystem in .NET Core and Kafka for a multi-tenant platform scaling to 150 customers with 5 endpoints each, decoupling stored-procedure completion events from HTTP delivery via a polling microservice and async message queue, with at-least-once delivery guaranteed by acknowledging only on 2xx and HMAC-SHA256 payload signatures.</li>
            <li>Scaled 6 microservices and REST APIs on Oracle Cloud Infrastructure to sustain 180 peak requests/sec at 140ms p99 and 99.95% availability, by adding connection pooling, response caching, and horizontal replica scaling.</li>
            <li>Designed an audit trail subsystem for APIs, modeling actor, operation type, affected entity, and field-level changes into a single polymorphic table serving about 100 endpoints, with writes dispatched asynchronously to keep audit capture off the request path.</li>
          </ul>
        </div>

        <div className="border-l-2 border-zinc-200 pl-6 pb-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold">Associate Software Developer</h3>
            <span className="text-zinc-500 text-sm font-mono">Jul 2023 — Aug 2024</span>
          </div>
          <p className="text-zinc-600 font-medium mb-4">Oracle | Hyderabad, India</p>
          <ul className="list-disc list-inside text-zinc-600 space-y-2">
            <li>Raised query throughput 77% by building a C# query builder that enforced index-driven execution plans, eliminating 12 sequential full-table scans and removing in-memory sorts from the 8 hottest production queries.</li>
            <li>Reduced p99 authorization API latency 23% by profiling hot request paths with OpenTelemetry, short-circuiting 4 redundant policy evaluations per request, and caching resolved permission sets.</li>
            <li>Cut load-test error rate 63% (8.1% → 3.0%) under 2,000 concurrent users by building a Gatling suite that surfaced saturation failures, then implementing rate limiting and circuit breaking via Polly.</li>
          </ul>
        </div>
      </section>
      </Reveal>

      {/* EDUCATION */}
      <Reveal>
      <section id="education" className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><GraduationCap size={24}/> Education</h2>

        <div className="border-l-2 border-zinc-200 pl-6 pb-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold">University of Southern California</h3>
            <span className="text-zinc-500 text-sm font-mono">June 2025 — December 2026</span>
          </div>
          <p className="text-zinc-600 font-medium">MS, Computer Science | Los Angeles, CA</p>
          <p className="text-zinc-500 text-sm mt-1">GPA: 3.81 / 4.0</p>
        </div>

        <div className="border-l-2 border-zinc-200 pl-6 pb-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold">Maulana Azad National Institute of Technology</h3>
            <span className="text-zinc-500 text-sm font-mono">Aug 2019 — May 2023</span>
          </div>
          <p className="text-zinc-600 font-medium">B.Tech, Computer Science and Engineering | Bhopal, India</p>
          <p className="text-zinc-500 text-sm mt-1">GPA: 8.89 / 10.0</p>
        </div>
      </section>
      </Reveal>

      {/* TECHNICAL EXPERTISE */}
      <Reveal>
      <section id="expertise" className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Database size={24}/> Technical Expertise</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Languages */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-zinc-800 border-b border-zinc-100 pb-2">Languages</h3>
            <ul className="space-y-3 text-zinc-600 text-sm font-medium">
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> C / C++</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> C#</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Go</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Python</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Java</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> JavaScript</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> SQL / PL/SQL</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Solidity</li>
            </ul>
          </div>

          {/* Backend & Frameworks */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-zinc-800 border-b border-zinc-100 pb-2">Backend & Frameworks</h3>
            <ul className="space-y-3 text-zinc-600 text-sm font-medium">
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> .NET Core</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Node.js</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> React / Next.js</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> FastAPI</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> REST APIs</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Microservices</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Distributed Systems</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Emissary-Ingress</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Webhooks</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Kafka</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Multithreading</li>
            </ul>
          </div>

          {/* Databases & ML */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-zinc-800 border-b border-zinc-100 pb-2">Databases & ML</h3>
            <ul className="space-y-3 text-zinc-600 text-sm font-medium">
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> PostgreSQL</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Oracle DB</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> DuckDB</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Neo4j</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Query Optimization</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Indexing (B-Tree, HNSW)</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Vector Search</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> PyTorch / CLIP</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> OpenCV / Keras</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Pandas</li>
            </ul>
          </div>

          {/* Cloud & Tools */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-zinc-800 border-b border-zinc-100 pb-2">Cloud & Tools</h3>
            <ul className="space-y-3 text-zinc-600 text-sm font-medium">
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Oracle Cloud (OCI)</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Docker</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Linux / UNIX</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> CI/CD</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Git</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> GDB / LLDB</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> pgbench / TPC-H</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Streamlit</li>
            </ul>
          </div>

          {/* Testing & Observability */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-zinc-800 border-b border-zinc-100 pb-2">Testing & Observability</h3>
            <ul className="space-y-3 text-zinc-600 text-sm font-medium">
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Unit & Integration Testing</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> xUnit</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Gatling</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> JMeter</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Polly</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> OpenTelemetry</li>
              <li className="flex items-start gap-2"><span className="text-zinc-400 mt-[2px]">▸</span> Performance Tuning</li>
            </ul>
          </div>

        </div>
      </section>
      </Reveal>

      {/* PROJECTS WITH FILTERS */}
      <Reveal>
      <section id="projects" className="max-w-4xl mx-auto px-6 py-12 mb-24">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Code size={24}/>Featured Projects</h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category 
                  ? 'bg-zinc-900 text-white' 
                  : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj, pIdx) => {
            const hasLink = Boolean(proj.link);

            // The inner content of the card is the same, but we only apply 
            // group-hover classes if the card is an actual link.
            const cardContent = (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold ${hasLink ? 'group-hover:text-zinc-600 transition-colors' : ''}`}>
                    {proj.title}
                  </h3>
                  {hasLink && (
                    <ExternalLink size={18} className="text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:text-zinc-900 transition-all duration-300" />
                  )}
                </div>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed flex-grow">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-500 mt-auto">
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`bg-zinc-100 px-2 py-1 rounded border border-zinc-200 ${hasLink ? 'group-hover:bg-white transition-colors' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            );

            // If it has a link, render an <a> tag with hover effects
            if (hasLink) {
              return (
                <a 
                  key={pIdx} 
                  href={proj.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group block"
                >
                  {cardContent}
                </a>
              );
            }

            // If no link, render a static <div> with no hover effects
            return (
              <div 
                key={pIdx} 
                className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col h-full"
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>
      </Reveal>
    </div>
  );
}
