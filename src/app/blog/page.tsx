import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Blog - RetroToolsHQ",
  description: "Tips, guides, and best practices for character counting and text analysis. Learn how to optimize your writing for different platforms.",
};

const blogPosts = [
  {
    slug: "why-character-count-matters",
    title: "Why Character Count Matters: A Comprehensive Guide",
    excerpt: "Understanding character limits is essential for social media success. Learn how character counting impacts your content strategy across different platforms.",
    date: "2024-03-05",
    readTime: "8 min read",
  },
  {
    slug: "twitter-x-character-limits",
    title: "Mastering X (Twitter) Character Limits: Best Practices",
    excerpt: "X posts now allow up to 280 characters. Discover strategies for crafting impactful tweets that maximize engagement within the character limit.",
    date: "2024-02-28",
    readTime: "6 min read",
  },
  {
    slug: "instagram-bio-optimization",
    title: "Instagram Bio Optimization: Making Every Character Count",
    excerpt: "Your Instagram bio has a 150-character limit. Learn how to write a compelling bio that converts visitors and showcases your brand.",
    date: "2024-02-20",
    readTime: "5 min read",
  },
  {
    slug: "social-media-character-limits",
    title: "2024 Social Media Character Limits: Platform Comparison",
    excerpt: "A comprehensive comparison of character limits across Facebook, LinkedIn, TikTok, YouTube, and more. Stay updated with the latest platform specifications.",
    date: "2024-02-15",
    readTime: "7 min read",
  },
  {
    slug: "writing-concisely",
    title: "The Art of Writing Concisely: Techniques for Maximum Impact",
    excerpt: "Expressing complex ideas in fewer words is a valuable skill. Explore proven techniques used by professional writers and content creators.",
    date: "2024-02-10",
    readTime: "9 min read",
  },
  {
    slug: "seo-meta-descriptions",
    title: "SEO Meta Description Length: Guidelines for Search Rankings",
    excerpt: "Meta descriptions should be between 150-160 characters. Learn how to write SEO-friendly meta descriptions that improve click-through rates.",
    date: "2024-02-05",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-text mb-4">Blog</h1>
          <p className="text-lg text-brand-text-secondary">Discover insights, tips, and best practices for character counting, writing concisely, and optimizing your content across social media platforms.</p>
        </div>

        <div className="grid gap-8 md:gap-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="blog-card p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-3 group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-brand-text-secondary mb-4">{post.excerpt}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="text-sm text-brand-text-tertiary">
                  <span>{post.date}</span>
                  <span className="mx-2">&bull;</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-brand-accent hover:text-brand-accent-dark font-semibold inline-flex items-center group">
                  Read article
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 pt-12 border-t border-brand-border">
          <h2 className="text-3xl font-bold text-brand-text mb-6">Why Read Our Blog?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-3">Expert Insights</h3>
              <p className="text-brand-text-secondary">Learn from content creators and social media strategists with years of experience optimizing text for maximum impact.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-3">Platform Guides</h3>
              <p className="text-brand-text-secondary">Get detailed guides for each major platform, including character limits, best practices, and optimization strategies.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-3">Practical Tips</h3>
              <p className="text-brand-text-secondary">Discover actionable techniques you can implement immediately to improve your content and engagement rates.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
