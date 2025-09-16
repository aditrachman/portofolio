import React, { ReactNode } from "react";

export default function Title({
  children,
  emoji,
}: {
  children: ReactNode;
  emoji: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
        <span className="text-2xl sm:text-3xl">
          {emoji}
        </span>
        <span>
          {children}
        </span>
      </h2>
    </div>
  );
}
