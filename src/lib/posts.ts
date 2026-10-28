import fs from "node:fs";
import sanitizeHtml from "sanitize-html";
import { blogUi } from "@/content/blog";

/**
 * Blog posts, read from the CRM's blog while the site is built. The site is a
 * static export (§3), so this runs during `next build` only: the token never
 * reaches a browser, and a new post appears once the site is rebuilt.
 *
 * Two environment variables, both optional:
 * - `BLOG_API_TOKEN`: a private-app access token from the CRM with read
 *   access to blog content. Without it the blog has no posts and shows the
 *   "published only after review and approval" line. It is a secret: set it
 *   as a repository secret for the deploy workflow, never in the repo.
 * - `BLOG_ID`: the id of the one blog to show. Without it, every blog in the
 *   account is shown.
 *
 * `BLOG_SAMPLE_FILE` points at a JSON file shaped like one page of the API's
 * answer (`{ "results": [...] }`), read instead of the API: for trying the
 * pages locally without a token.
 */

const API = "https://api.hubapi.com/cms/v3/blogs/posts";

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date and time the post was published. */
  date: string;
  /** The post body, cleaned (see `BODY`). */
  html: string;
  minutes: number;
};

/** The fields this site reads from the API's blog post object. */
type ApiPost = {
  id: string;
  slug?: string;
  name?: string;
  htmlTitle?: string;
  metaDescription?: string;
  postSummary?: string;
  postBody?: string;
  publishDate?: string;
  state?: string;
  currentState?: string;
  contentGroupId?: string;
};

type ApiPage = { results?: ApiPost[]; paging?: { next?: { after?: string } } };

/**
 * What a post body may keep. The CRM's editor adds its own classes, inline
 * styles, scripts and embeds; all of that goes, so a post reads in the site's
 * type and palette (§4) and cannot run code on the page. One h1 per page
 * (§8): a heading 1 in a post becomes a heading 2.
 */
const BODY: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "h4", "p", "br", "hr", "ul", "ol", "li", "blockquote", "strong", "em", "b", "i", "a",
    "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td", "code", "pre",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "width", "height"],
    th: ["scope", "colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["https", "mailto"],
  transformTags: {
    h1: "h2",
    h5: "h4",
    h6: "h4",
    a: (tagName, { href }) => {
      const attribs: sanitizeHtml.Attributes = {};
      if (href) attribs.href = href;
      if (href?.startsWith("https:")) Object.assign(attribs, { rel: "noopener noreferrer", target: "_blank" });
      return { tagName, attribs };
    },
  },
  // The editor leaves empty paragraphs between blocks.
  exclusiveFilter: (frame) => frame.tag === "p" && !frame.text.trim() && frame.mediaChildren.length === 0,
};

const isPublished = (post: ApiPost, now: number) =>
  (post.state === "PUBLISHED" || post.currentState === "PUBLISHED") &&
  !!post.publishDate &&
  Date.parse(post.publishDate) <= now;

/** The last part of the CRM's slug ("blog/my-post" becomes "my-post"), safe as a folder name. */
const toSlug = (post: ApiPost) =>
  (post.slug ?? "").split("/").filter(Boolean).pop()?.toLowerCase().replace(/[^a-z0-9-]+/g, "-") || post.id;

const plainText = (html: string) => sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();

function toPost(post: ApiPost): Post {
  const html = sanitizeHtml(post.postBody ?? "", BODY);
  const words = plainText(html).split(" ").filter(Boolean).length;
  return {
    slug: toSlug(post),
    title: (post.name || post.htmlTitle || blogUi.untitled).trim(),
    description: (post.metaDescription || plainText(post.postSummary ?? "")).trim(),
    date: post.publishDate ?? "",
    html,
    // At an unhurried 200 words a minute. Never 0.
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

async function fetchPages(token: string): Promise<ApiPost[]> {
  const posts: ApiPost[] = [];
  let after: string | undefined;
  do {
    const url = new URL(API);
    url.searchParams.set("limit", "100");
    url.searchParams.set("archived", "false");
    if (after) url.searchParams.set("after", after);
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    // Fail the build rather than deploy a blog that silently lost its posts.
    if (!response.ok) {
      throw new Error(`Blog: the CRM answered ${response.status} ${response.statusText}. Check BLOG_API_TOKEN.`);
    }
    const page = (await response.json()) as ApiPage;
    posts.push(...(page.results ?? []));
    after = page.paging?.next?.after;
  } while (after);
  return posts;
}

async function loadPosts(): Promise<Post[]> {
  const sample = process.env.BLOG_SAMPLE_FILE;
  const token = process.env.BLOG_API_TOKEN;
  let raw: ApiPost[];
  if (sample) raw = ((JSON.parse(fs.readFileSync(sample, "utf8")) as ApiPage).results ?? []);
  else if (token) raw = await fetchPages(token);
  else return [];

  const blogId = process.env.BLOG_ID;
  const now = Date.now();
  const posts = raw
    .filter((post) => isPublished(post, now) && (!blogId || post.contentGroupId === blogId))
    .map(toPost)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  // Two posts on one address would overwrite each other in the export.
  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) throw new Error(`Blog: two posts share the address "${post.slug}".`);
    seen.add(post.slug);
  }
  return posts;
}

let cached: Promise<Post[]> | undefined;

/** Every published post, newest first. Read once per build worker. */
export function getAllPosts(): Promise<Post[]> {
  cached ??= loadPosts();
  return cached;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getAllPosts()).find((post) => post.slug === slug);
}
