import Title from "@/components/Layout/Title";
import React from "react";

export default function About() {
  return (
    <section>
      <Title emoji="🙌">About</Title>
      <div className="space-y-8">
        <p>
          I was born in Magelang, Indonesia, and I’m a frontend developer
           and data analyst. Since an early age, I’ve been fascinated by 
           technology and creativity, which led me to explore how things work 
           and how data can shape better decisions.a Front End developer who loves to create new things
        </p>
        <ul className="list-disc space-y-4 justify ml-8 dot">
          <li>
            I spend my time building and developing web applications 
            while also analyzing data to generate meaningful insights.{" "}
          </li>
          <li>
            I enjoy collaborating with others, contributing to projects,
             and bringing fresh perspectives to the table.{" "}
          </li>
          <li>
           If you have an interesting project or need someone with a mix 
           of frontend and data analysis skills, feel free to reach out—I’d 
           be happy to collaborate!
          </li>
        </ul>
      </div>
    </section>
  );
}
