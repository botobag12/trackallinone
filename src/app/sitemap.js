import couriers from "@/data/couriers";

export default function sitemap() {
  const baseUrl = "https://trackallinone.com";

  const staticPages = [
    "",
    "/couriers",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const courierUrls = couriers.map((courier) => ({
    url: `${baseUrl}/couriers/${courier.id}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...courierUrls];
}