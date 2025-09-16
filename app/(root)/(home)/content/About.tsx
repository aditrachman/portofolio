import Title from "@/components/Layout/Title";
import React from "react";

export default function About() {
  const skills = [
    "React & Next.js",
    "TypeScript",
    "Data Analysis",
    "Python",
    "TailwindCSS",
    "Firebase"
  ];

  return (
    <section className="space-y-8">
      <Title emoji="👋">About</Title>

      <div className="space-y-8">
        <div className="space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            I was born in <span className="text-white font-medium">Magelang, Indonesia</span>, and I'm a frontend developer
            and data analyst. Since an early age, I've been fascinated by
            technology and creativity, which led me to explore how things work
            and how data can shape better decisions.
          </p>

          <p className="text-foreground-muted leading-relaxed">
            My journey combines the art of creating beautiful, functional user interfaces
            with the science of extracting meaningful insights from data. I believe that
            great products are born from the intersection of design, technology, and data-driven decisions.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-background-secondary border border-border rounded-lg text-sm text-foreground-muted hover:text-foreground hover:border-border-light transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-border rounded-2xl p-6 bg-background-secondary/30">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Let's Work Together</h3>
            <p className="text-foreground-muted leading-relaxed">
              If you have an interesting project or need someone with a mix
              of frontend and data analysis skills, feel free to reach out—I'd
              be happy to collaborate and bring your ideas to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}