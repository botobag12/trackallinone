
import couriers from "@/data/couriers";
import { client } from "@/sanity/lib/client";

// Refresh the sitemap at least once per hour.
export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://www.trackallinone.com";

  const staticPages = [
    "",
    "/couriers",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/guides",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const courierUrls = couriers.map((courier) => ({
    url: `${baseUrl}/couriers/${courier.id}`,
    lastModified: new Date(),
  }));

  const guideHubUrls = couriers.map((courier) => ({
    url: `${baseUrl}/guides/${courier.id}`,
    lastModified: new Date(),
  }));

  // Fetch published articles from Sanity.
  let articles = [];

  try {
    articles = await client.fetch(
      `*[
        _type == "post" &&
        !(_id in path("drafts.**")) &&
        defined(slug.current) &&
        defined(courierId) &&
        defined(publishedAt) &&
        publishedAt <= $now
      ] {
        "slug": slug.current,
        courierId,
        "lastModified": _updatedAt
      }`,
      { now: new Date().toISOString() }
    );
  } catch (error) {
    console.error("Could not fetch Sanity articles for sitemap:", error);
  }

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/guides/${article.courierId}/${article.slug}`,
    lastModified: new Date(article.lastModified || new Date()),
  }));

  return [
    ...staticUrls,
    ...courierUrls,
    ...guideHubUrls,
    ...articleUrls,
  ];
}
