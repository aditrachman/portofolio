"use client";

import Link from "next/link";
import { Instagram, GitHub, Mail, ExternalLink } from "react-feather";
import { useState, useEffect } from "react";

export default function Footer() {
  const [time, setTime] = useState<string>("");

  const formatTime = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

  const updateTime = () => {
    const today = new Date();
    const hh = today.getHours();
    const mm = today.getMinutes();
    const ss = today.getSeconds();

    const formattedTime = `${formatTime(hh)}:${formatTime(mm)}:${formatTime(ss)}`;
    setTime(formattedTime);
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/aditrachman23",
      icon: Instagram,
    },
    {
      name: "GitHub",
      href: "https://github.com/aditrachman",
      icon: GitHub,
    },
    {
      name: "Email",
      href: "mailto:aditrachman@example.com",
      icon: Mail,
    }
  ];

  return (
    <footer className="border-t border-border bg-background-secondary/50">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-foreground-muted">
            <p>
              © {new Date().getFullYear()} Aditrachman. All rights reserved.
            </p>
            {time && (
              <div className="flex items-center gap-2 font-mono text-xs">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Jakarta • {time}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:border-border-light transition-colors text-foreground-muted hover:text-foreground"
                  aria-label={social.name}
                >
                  <Icon size={16} />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-foreground-muted">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
