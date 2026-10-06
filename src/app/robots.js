export default function robots() {
  const baseUrl = "https://trackallinone.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}