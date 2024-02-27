import rss from "@astrojs/rss";
import { SITE } from "@config";
import getSortedPosts from "@utils/getSortedPosts";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug, body }) => ({
      link: `posts/${slug}`,
      title: data.title,
      content: sanitizeHtml(parser.render(body)),
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
