"use client";

import Giscus from "@giscus/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "react-feather";

// ponytail: giscus.app down → iframe nggak pernah load, timeout-detection
// upgrade path: giscus native error callback kalau tersedia di masa depan
const LOAD_TIMEOUT = 15000;
const DISCUSSIONS_URL = "https://github.com/aditrachman/portofolio/discussions";

export default function GuestBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFailed(true), LOAD_TIMEOUT);
    const iv = setInterval(() => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (iframe) {
        iframe.addEventListener(
          "load",
          () => {
            clearTimeout(timeout);
            setFailed(false);
          },
          { once: true }
        );
        clearInterval(iv);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
      clearInterval(iv);
    };
  }, []);

  return (
    <section>
      {failed ? (
        <div className="border border-border rounded-2xl p-6 bg-background-secondary/30 text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-background-tertiary rounded-full">
              <MessageCircle size={20} className="text-foreground-muted" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-foreground">
              Comments unavailable right now
            </h3>
            <p className="text-sm text-foreground-muted">
              The comments service (giscus) is having issues. You can still
              leave a message directly on GitHub.
            </p>
          </div>
          <Link
            href={DISCUSSIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
          >
            Open GitHub Discussions
          </Link>
        </div>
      ) : (
        <div ref={containerRef}>
          <Giscus
            repo="aditrachman/portofolio"
            repoId="R_kgDOPnMSwQ"
            category="General"
            categoryId="DIC_kwDOPnMSwc4Cuyor"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="transparent_dark"
            lang="en"
          />
        </div>
      )}
    </section>
  );
}
