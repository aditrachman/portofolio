import { formatDate } from "@/libs/Blog/formatDate";
import {
  components,
  getAllPosts,
  getPostBySlug,
  mdxOptions,
} from "@/libs/Blog/post";
import { getComments } from "@/libs/comments";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Comments from "@/components/Comments";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const cleanContent = post.content
    .replace(/<[^>]*>/g, "")
    .replace(/^#+\s*/gm, "")
    .trim();
  const description =
    cleanContent.split(/\.\n|\.\s/).slice(0, 2).join(". ").slice(0, 160) ||
    `Baca ${post.title} di blog Adit Rachman.`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags ? [post.tags] : [],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  if (!params || !(await params).slug) {
    notFound();
  }
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const comments = await getComments(slug);

  return (
    <section>
      <header>
        <ul className="flex gap-3 text-sm">
          <li>
            <Link href={"/"} className="hover:underline">
              . .
            </Link>
          </li>
          /
          <li>
            <Link href={"/writings"} className="hover:underline">
              writings
            </Link>
          </li>
          /
        </ul>
        <h1 className="text-5xl font-bold mb-5">{post.title}</h1>
        <hr className="mt-20 mb-5 border-t border-t-[#252529]" />
        <div className="flex justify-between items-center mx-2">
          <Link
            className="text-sm hover:underline bg-[#18181b] border border-[#252529] rounded px-1 py-0.5 text-zinc-500"
            href={`/writings/tags/${post.tags}`}
          >
            # {post.tags}
          </Link>{" "}
          <ul className="flex text-xs gap-2">
            <li>{formatDate(post.date)}</li>·<li>{post.readTime} min read</li>
          </ul>
        </div>
        <hr className="mt-5 mb-20 border-t border-t-[#252529]" />
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: "Adit Rachman",
            },
            description: post.tags || `Baca ${post.title} di blog Adit Rachman.`,
          }),
        }}
      />
      <article className="prose lg:prose-base prose-invert">
        <MDXRemote
          source={post.content}
          options={mdxOptions}
          components={components}
        />
      </article>
      <p className="mt-16 text-zinc-500 text-sm font-mono text-center">
        ~ Its the End of{" "}
        <span className="text-violet-300 underline">{post.title}</span> ~
      </p>

      <Comments slug={slug} initialComments={comments} />
    </section>
  );
}
