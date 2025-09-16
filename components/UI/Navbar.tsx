"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/libs/cn";
import { Drawer } from "vaul";
import { useId, useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const drawerId = useId();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Links = [
    { label: "home", path: "/" },
    { label: "writings", path: "/writings" },
    { label: "guestbook", path: "/guestbook" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled
        ? "glass border-b border-border py-4"
        : "border-b border-border py-6 sm:py-8"
    )}>
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl flex justify-between items-center">
        <Link
          href="/"
          className="group flex items-center space-x-2 hover-lift"
        >
          <div className="relative">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={24}
              height={24}
              className="transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>

        <ul className="hidden sm:flex items-center gap-1">
          {Links.map((nav, idx) => (
            <li key={idx}>
              <Link
                href={nav.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium capitalize rounded-lg transition-all duration-200",
                  "hover:bg-background-tertiary hover:text-foreground",
                  pathname === nav.path
                    ? "text-accent bg-background-tertiary"
                    : "text-foreground-muted"
                )}
              >
                {nav.label}
                {pathname === nav.path && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Drawer */}
        <div className="block sm:hidden">
          <Drawer.Root>
            <Drawer.Trigger
              aria-controls={drawerId}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary hover:bg-border transition-colors"
            >
              <div className="flex flex-col space-y-1">
                <div className="w-4 h-0.5 bg-foreground rounded-full" />
                <div className="w-4 h-0.5 bg-foreground rounded-full" />
                <div className="w-4 h-0.5 bg-foreground rounded-full" />
              </div>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
              <Drawer.Content
                id={drawerId}
                className="glass flex flex-col rounded-t-2xl mt-24 h-fit fixed bottom-0 left-0 right-0 border-t border-border"
              >
                <div className="p-6 rounded-t-2xl flex-1">
                  <div
                    aria-hidden
                    className="mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-border mb-8"
                  />
                  <div className="max-w-md mx-auto">
                    <Drawer.Title className="hidden" />
                    <div className="space-y-2">
                      {Links.map((nav, idx) => (
                        <Link
                          key={idx}
                          href={nav.path}
                          className={cn(
                            "block border border-border rounded-xl py-4 px-6 text-center capitalize font-medium transition-all",
                            "hover:bg-background-tertiary hover:border-border-light",
                            pathname === nav.path
                              ? "bg-background-tertiary border-accent text-accent"
                              : "text-foreground-muted"
                          )}
                        >
                          {nav.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </nav>
  );
}