export default function robots() {
  const baseUrl = "https://www.trackallinone.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
