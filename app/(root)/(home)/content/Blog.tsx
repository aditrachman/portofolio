import PostCard from "@/components/Layout/PostCard";
import Title from "@/components/Layout/Title";
import { getAllPosts } from "@/libs/Blog/post";
import Link from "next/link";
import React from "react";
import { ArrowRight, PenTool } from "react-feather";

export default async function Blog() {
  const generatePost = getAllPosts();

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <Title emoji="✍️">Latest Writings</Title>
        <Link
          href={"/writings"}
          className="group flex items-center gap-2 px-4 py-2 text-sm text-foreground-muted hover:text-accent transition-colors rounded-lg hover:bg-background-tertiary"
        >
          <span>View all</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {generatePost.length > 0 ? (
          generatePost
            .slice(0, 3)
            .map((post, index) => (
              <div key={post.slug} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard post={post} />
              </div>
            ))
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-background-tertiary rounded-full">
                <PenTool size={32} className="text-foreground-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">No posts yet</h3>
              <p className="text-foreground-muted">
                I'm working on some amazing content. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>

      {generatePost.length > 3 && (
        <div className="text-center pt-4">
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-all hover-lift font-medium"
          >
            <PenTool size={16} />
            Read More Articles
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}