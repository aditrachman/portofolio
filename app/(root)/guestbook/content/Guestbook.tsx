"use client";

import Giscus from "@giscus/react";

export default function GuestBook() {
  return (
    <section>
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
    </section>
  );
}
