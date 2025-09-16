import Footer from "@/components/UI/Footer";
import Navbar from "@/components/UI/Navbar";
import React, { ReactNode } from "react";

export default function layout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl w-full py-12 sm:py-16 lg:py-20">
        <div className="animate-fade-in-up">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
