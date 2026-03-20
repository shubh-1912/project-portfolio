"use client";

import React, { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Database, Server, Code, Terminal } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Flattened project data for easy filtering
  const projects = [
    {
      title: "Weenix Operating System",
      category: "Systems Engineering",
      description: "Developed core OS components including processes, threads, virtual file systems, and virtual memory management in C.",
      tags: ["C", "Kernel", "Systems Programming"]
    },
    {
      title: "PostgreSQL B-Tree Optimization",
      category: "Systems Engineering",
      description: "Implemented micro-optimizations within the PostgreSQL B-Tree index access method to improve query throughput and latency.",
      tags: ["C++", "Database Internals"]
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

  // Smooth scroll handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adds a little breathing room at the top
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
      
      {/* FLOATING RIGHT NAVIGATION (Desktop Only) */}
      <nav className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 group">
        <div className="bg-white border border-r-0 border-zinc-200 shadow-sm rounded-l-2xl py-3 px-2 transition-all duration-300 w-14 hover:w-40 overflow-hidden flex flex-col gap-2">
          {[
            { id: 'about', label: 'About', icon: Terminal },
            { id: 'experience', label: 'Experience', icon: Server },
            { id: 'projects', label: 'Projects', icon: Code },
            { id: 'toolkit', label: 'Toolkit', icon: Database },
          ].map((item) => (
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
      <header className="max-w-4xl mx-auto px-6 py-24 md:py-32">
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
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-200 text-zinc-900 rounded-full hover:bg-zinc-300 transition-colors">
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
          I build robust, high-performance systems. From shaving milliseconds off API response times at Oracle to diving deep into OS kernels and database micro-optimizations, I thrive on solving complex architectural problems. When I am not writing C++ or optimizing PostgreSQL indexes, you can usually find me hiking the trails around DTLA or editing photos.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Server size={24}/> Experience</h2>
        
        <div className="border-l-2 border-zinc-200 pl-6 pb-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold">Software Engineer</h3>
            <span className="text-zinc-500 text-sm font-mono">Sep 2024 — May 2025</span>
          </div>
          <p className="text-zinc-600 font-medium mb-4">Oracle | Hyderabad, India</p>
          <ul className="list-disc list-inside text-zinc-600 space-y-2">
            <li>Engineered microservices-based CRUD APIs on Oracle Cloud Infrastructure, delivering a robust product.</li>
            <li>Optimized sensitive authorization flow, reducing API response times by 23% securely.</li>
            <li>Built production-level POCs for Webhooks and custom API Gateways, cutting projected infra costs by 30%.</li>
          </ul>
        </div>

        <div className="border-l-2 border-zinc-200 pl-6 pb-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold">Associate Software Developer</h3>
            <span className="text-zinc-500 text-sm font-mono">Jul 2023 — Aug 2024</span>
          </div>
          <p className="text-zinc-600 font-medium mb-4">Oracle | Hyderabad, India</p>
          <ul className="list-disc list-inside text-zinc-600 space-y-2">
            <li>Improved RESTful API performance by 77% and built an intricate query builder for complex data retrieval.</li>
            <li>Established Gatling framework for rate limiting & circuit breaking, reducing errors by 63%.</li>
          </ul>
        </div>
      </section>

      {/* PROJECTS WITH FILTERS */}
      <section id="projects" className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Code size={24}/> Selected Projects</h2>
        
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
          {filteredProjects.map((proj, pIdx) => (
            <div key={pIdx} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{proj.title}</h3>
              </div>
              <p className="text-zinc-600 text-sm mb-6 leading-relaxed flex-grow">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-500 mt-auto">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-zinc-100 px-2 py-1 rounded border border-zinc-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="toolkit" className="max-w-4xl mx-auto px-6 py-12 mb-24">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Database size={24}/> Toolkit</h2>
        <div className="flex flex-wrap gap-3">
          {['C', 'C++', 'Python', 'Go', 'SQL', 'PostgreSQL', 'Java', 'JavaScript', 'Solidity', 'OCI', '.NET Core', 'Docker', 'OpenTelemetry', 'Linux'].map((skill) => (
            <span key={skill} className="px-4 py-2 bg-zinc-100 text-zinc-800 rounded-lg text-sm font-medium border border-zinc-200">
              {skill}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}