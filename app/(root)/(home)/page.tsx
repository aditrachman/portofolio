import Divider from "@/components/Layout/Divider";
import Image from "next/image";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import Blog from "./content/Blog";
import About from "./content/About";
import Projects from "./content/Projects";

export default function page() {
  return (
    <>
      <section>
        <div className="flex justify-between flex-col-reverse md:flex-row">
          <div className="mt-8 sm:mt-0 space-y-5 sm:w-2/3">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Adit Rachman
              </h1>
              <p className={`text-sm font-mono`}>FrontEnd & Data Analyst</p>
            </div>
            <p>
              Hi! I’m a frontend developer and data analyst. I love creating modern, user-friendly web apps and turning raw data into meaningful insights. My work combines design, coding, and data to deliver real impact.
            </p>
          </div>
          <div className="relative">
            <div className="relative">
              <Image
                src={"/assets/profile.jpg"}
                alt="profile pic"
                width={130}
                height={130}
                className="rounded-full grayscale hover:grayscale-0 duration-150"
              />
             
            </div>
           
          </div>
        </div>
        <div className="bg-[#18181b] border border-[#252529] p-5 rounded mt-10">
          <GitHubCalendar username="aditrachman" blockSize={9.174527726415} />
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
