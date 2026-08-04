import Title from "@/components/Layout/Title";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ExternalLink, GitHub } from "react-feather";

export default function Projects() {
  const projects = [
    {
      label: "VoxSwarm",
      image: "aether-swarm.png", // 
      tech: "Next.js & FastAPI",
      summary: "A professional Behavioral Intelligence Engine that simulates social agents' reactions to specific topics and predicts social stability or volatility using real-time data analysis.",
      tags: ["Next.js", "Tailwind CSS", "Python", "FastAPI"],
      link: "https://github.com/aditrachman/Simulation-Prediction-Engine",
      github: "https://github.com/aditrachman/Simulation-Prediction-Engine",
      status: "On Progress"
    },

    {
      label: "IoT Smart Irrigation",
      image: "iot-irrigation.png",
      tech: "ESP8266 & Firebase",
      summary: "An automated irrigation system on a Wemos D1 Mini (ESP8266) that waters plants based on real-time soil moisture from AHT10, GY-21, and BMP180 sensors, streamed to Firebase Realtime Database. Instead of watering on a fixed timer, it tracks moisture trends to predict when the soil actually needs water — so plants stay healthy and water isn't wasted.",
      tags: ["ESP8266", "Firebase", "C++", "IoT"],
      link: "",
      github: "",
      status: "In Progress"
    },

    {
      label: "MauRun",
      image: "maurun.png",
      tech: "Laravel 11 & Blade",
      summary: "A race event registration platform for Indonesian running events — from 3K fun runs to full marathons. Handles event management with quota control, online registration, and discount codes, built on Laravel 11 with Blade, Tailwind CSS, and MySQL.",
      tags: ["Laravel", "Blade", "TailwindCSS", "MySQL"],
      link: "https://github.com/aditrachman/MauRun",
      github: "https://github.com/aditrachman/MauRun",
      status: "Open Source"
    },

    {
      label: "Manga Recommender",
      image: "manga-recommender.png",
      tech: "Python & scikit-learn",
      summary: "A content-based manga recommendation system built with the CRISP-DM methodology. Scores similarity by blending genre multi-hot encoding, synopsis sentence embeddings (all-MiniLM-L6-v2), and themes scraped from the AniList API — evaluated with Precision/Recall and MAP.",
      tags: ["Python", "scikit-learn", "sentence-transformers", "CRISP-DM"],
      link: "https://github.com/aditrachman/Manga-Recommender",
      github: "https://github.com/aditrachman/Manga-Recommender",
      status: "Open Source"
    },

    {
      label: "Read Manga Website",
      image: "mocomanga.png",
      tech: "Next.js",
      tags: ["NextJS", "Firebase", "TailwindCSS"],
      summary:
        "Manga reader built with Next.js, Firebase, and TailwindCSS. Features an admin panel and real-time update feed.",
      link: "https://mocomanga.vercel.app/",
      github: "https://github.com/aditrachman/mocomanga",
      status: "Live"
    },
  ];

  return (
    <section id="projects" className="space-y-8">
      <Title emoji="💼">Projects</Title>

      <div className="space-y-8">
        {projects.map((project, idx) => {
          return (
            <div key={idx} className="border border-border rounded-2xl p-6 hover:border-border-light transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Project Image */}
                <div className="w-full lg:w-1/3 flex-shrink-0">
                  <div className="relative overflow-hidden rounded-xl border border-border aspect-video">
                    <Image
                      src={`/assets/project/${project.image}`}
                      alt={`${project.label} preview`}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs rounded-full border border-border">
                      {project.status}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-foreground">
                          {project.label}
                        </h3>
                        <p className="text-sm text-foreground-muted font-mono">
                          {project.tech}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-border hover:border-border-light transition-colors text-foreground-muted hover:text-foreground"
                            aria-label="View source code"
                          >
                            <GitHub size={16} />
                          </Link>
                        )}
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                          >
                            <ExternalLink size={14} />
                            View Project
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground-muted leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3 py-1 bg-background-secondary text-foreground-muted text-sm rounded-full border border-border font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link
          href="https://github.com/aditrachman"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-border-light text-foreground rounded-lg transition-colors"
        >
          <GitHub size={18} />
          View More on GitHub
          <ExternalLink size={14} />
        </Link>
      </div>
    </section>
  );
}