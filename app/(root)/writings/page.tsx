import PostCard from "@/components/Layout/PostCard";
import Title from "@/components/Layout/Title";
import { getAllPosts } from "@/libs/Blog/post";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Tulisan dan catatan seputar coding, AI, dan pengembangan web dari Adit Rachman.",
};

export default async function page() {
  const generatePost = await getAllPosts();
  return (
    <section>
      <Title emoji="✍️">Blog</Title>
      <div className="grid grid-cols-1 gap-3">
        {generatePost.map((post) => {
          return <PostCard key={post.slug} post={post} />;
        })}
      </div>
    </section>
  );
}
