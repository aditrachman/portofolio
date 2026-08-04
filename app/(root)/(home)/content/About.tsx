import Title from "@/components/Layout/Title";
import Link from "next/link";
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
            I&apos;m an <span className="text-white font-medium">Informatics Engineering</span> student
            at Universitas Muhammadiyah Magelang, and I build things at the
            intersection of frontend and data. As a teaching assistant for the
            Database course, I spend my weeks explaining query plans and
            normalization to juniors — which turned out to be the best crash
            course in thinking about data as a system, not a spreadsheet.
          </p>

          <p className="text-foreground-muted leading-relaxed">
            My hands-on work mirrors that: React &amp; Next.js for the interface
            layer, Python for analysis and machine learning, Firebase for the
            plumbing in between. I&apos;m most interested in data-driven
            products — the kind that feel alive because they&apos;re actually
            reading signals, not static screens.
          </p>

          <p className="text-foreground-muted leading-relaxed">
            Right now I&apos;m exploring predictive modeling on IoT sensor data,
            and an AI-assisted coding workflow I&apos;ve been documenting on{" "}
            <Link href="/writings" className="text-white hover:underline">
              my blog
            </Link>
            . I&apos;m looking for frontend, data, or full-stack
            opportunities — remote or in Magelang.
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
            <h3 className="text-lg font-medium text-foreground">Let&apos;s Work Together</h3>
            <p className="text-foreground-muted leading-relaxed">
              If you have an interesting project or need someone with a mix
              of frontend and data analysis skills, feel free to reach out—I&apos;d
              be happy to collaborate and bring your ideas to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
