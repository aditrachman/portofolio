import Link from "next/link";
import type { Post } from "@/types";
import { formatDate } from "@/libs/Blog/formatDate";
import { Clock, Calendar, ArrowRight } from "react-feather";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border border-border rounded-2xl p-6 hover:border-border-light transition-colors group">
      <div className="flex items-start gap-4">
        {/* Emoji Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-background-secondary border border-border rounded-xl flex items-center justify-center text-xl">
          {post.emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="space-y-2">
            <Link href={`/writings/${post.slug}`}>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors cursor-pointer">
                {post.title}
              </h3>
            </Link>

            <div className="flex items-center gap-4 text-sm text-foreground-muted">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{post.readTime} min read</span>
              </div>
              <div className="w-1 h-1 bg-foreground-muted rounded-full" />
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href={`/writings/tags/${post.tags}`}
              className="inline-flex items-center px-3 py-1 bg-background-secondary text-foreground-muted text-sm rounded-full border border-border hover:border-border-light transition-colors font-mono"
            >
              #{post.tags}
            </Link>

            <Link
              href={`/writings/${post.slug}`}
              className="flex items-center gap-1 text-sm text-foreground-muted group-hover:text-white transition-colors"
            >
              <span>Read more</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}