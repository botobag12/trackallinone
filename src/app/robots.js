
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/"],
      },
    ],
    sitemap: "https://www.trackallinone.com/sitemap.xml",
    host: "https://www.trackallinone.com",
  };
}
