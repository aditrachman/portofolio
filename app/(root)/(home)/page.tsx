import Divider from "@/components/Layout/Divider";
import Image from "next/image";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import Blog from "./content/Blog";
import About from "./content/About";
import Projects from "./content/Projects";
import { MapPin, Calendar } from "react-feather";

export default function page() {
  return (
    <>
      <section className="space-y-12">
        {/* Hero Section */}
        <div className="flex flex-col-reverse sm:flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
          <div className="flex-1 space-y-8 text-center sm:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-foreground-muted">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Available for work</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                Adit Rachman
              </h1>

              <p className="text-lg sm:text-xl text-foreground-muted font-light">
                Frontend Developer & Data Analyst
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed max-w-2xl mx-auto sm:mx-0">
                I create modern web applications and analyze data to build meaningful digital experiences.
                Currently focused on React, Next.js, and data visualization.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-foreground-muted">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Since 2020</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={"/assets/profile.jpg"}
                alt="Adit Rachman"
                width={200}
                height={200}
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 border border-border object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* GitHub Activity */}
        <div className="border border-border rounded-2xl p-6 bg-background-secondary/50">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-2">GitHub Activity</h3>
            <p className="text-sm text-foreground-muted">Contributions over the past year</p>
          </div>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="aditrachman"
              blockSize={12}
              colorScheme="dark"
              theme={{
                dark: ['#0a0a0a', '#1a1a1a', '#2a2a2a', '#4a4a4a', '#ffffff'],
              }}
            />
          </div>
        </div>
      </section>

      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Blog />
    </>
  );
}