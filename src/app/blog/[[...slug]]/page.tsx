import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/blocks";
import { Container, Heading, Link, ReadingProgress, Section, Text } from "@/components/ui";
import { blogClosing, blogEmpty, blogHero, blogMeta, blogUi } from "@/content/blog";
import { routes } from "@/content/site";
import { formatDate } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { getAllPosts, getPost, type Post } from "@/lib/posts";

/**
 * The blog and its posts, in one route: `/blog/` is the list, `/blog/<slug>/`
 * a post. One optional catch-all rather than a page plus `[slug]`, because a
 * static export refuses a `[slug]` route with nothing to build, and until the
 * CRM's blog has posts there is nothing.
 */

/** Static export: every address is known at build time, and no other. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return [{ slug: [] }, ...posts.map((post) => ({ slug: [post.slug] }))];
}

export async function generateMetadata({ params }: PageProps<"/blog/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  if (!slug?.length) {
    // Offered to search once there is something to read.
    return pageMetadata(blogMeta, { index: (await getAllPosts()).length > 0 });
  }
  const post = await getPost(slug[0]);
  if (!post) return {};
  const metadata = pageMetadata({ title: post.title, description: post.description });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.date } };
}

export default async function BlogPage({ params }: PageProps<"/blog/[[...slug]]">) {
  const { slug } = await params;
  if (!slug?.length) return <BlogIndex posts={await getAllPosts()} />;
  const post = slug.length === 1 ? await getPost(slug[0]) : undefined;
  if (!post) notFound();
  return <PostArticle post={post} />;
}

/**
 * The live /resources opening, then every post, newest first. Until the
 * first post is published, the live site's line on review and approval
 * stands in for the list.
 */
function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <main id="main" className="flex-1">
      <PageHero copy={blogHero} />

      <Section spacing="md" tone="subtle">
        <Container width="wide">
          {posts.length === 0 ? (
            <>
              <Heading level={2} size="lg" className="max-w-[40ch] text-balance">
                {blogEmpty.heading}
              </Heading>
              <Text tone="muted" size="lg" className="mt-5">
                {blogEmpty.intro}
              </Text>
            </>
          ) : (
            <ul className="flex flex-col">
              {posts.map((post) => (
                <li key={post.slug} className="border-t border-border last:border-b">
                  <NextLink
                    href={`${routes.blog}${post.slug}/`}
                    className="group grid gap-2 py-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:grid-cols-[minmax(0,16ch)_minmax(0,1fr)] sm:gap-8"
                  >
                    <time dateTime={post.date} className="text-sm text-fg-muted tabular-nums">
                      {formatDate(post.date)}
                    </time>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-fg underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-current">
                        {post.title}
                      </h2>
                      {post.description ? (
                        <Text tone="muted" className="mt-3 max-w-[62ch]">
                          {post.description}
                        </Text>
                      ) : null}
                    </div>
                  </NextLink>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaBand copy={blogClosing} />
    </main>
  );
}

/**
 * One post: back to the list, the date and reading time, the title, then the
 * body as the CRM wrote it, cleaned in `src/lib/posts.ts` and set in the
 * site's type by `.post-body` in globals.css.
 */
function PostArticle({ post }: { post: Post }) {
  return (
    <main id="main" className="flex-1">
      <ReadingProgress target="[data-article]" />
      <Section spacing="lg" className="pt-14 sm:pt-20 lg:pt-24">
        <Container width="prose">
          <Link href={routes.blog} className="text-sm">
            {blogUi.backLink}
          </Link>

          <article className="mt-10" data-article>
            <header>
              <p className="flex flex-wrap gap-x-4 text-sm text-fg-muted tabular-nums">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{blogUi.readingTime(post.minutes)}</span>
              </p>
              <Heading level={1} size="3xl" className="mt-4 text-balance">
                {post.title}
              </Heading>
            </header>
            {/* Cleaned to a fixed set of tags with no scripts or styles. */}
            <div className="post-body mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </Container>
      </Section>

      <CtaBand copy={blogClosing} />
    </main>
  );
}
