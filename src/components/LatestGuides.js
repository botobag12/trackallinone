
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import couriers from "@/data/couriers";
import styles from "@/app/guides/guides.module.css";

const LATEST_ARTICLES_QUERY = `*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(publishedAt desc)[0...4] {
  _id,
  title,
  "slug": slug.current,
  courierId,
  excerpt,
  publishedAt,
  mainImage {
    alt,
    asset-> {
      url
    }
  }
}`;

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function LatestGuides() {
  const articles = await client.fetch(
    LATEST_ARTICLES_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  if (!articles.length) return null;

  return (
    <section className={styles.content}>
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.sectionEyebrow}>
            LATEST COURIER ARTICLES
          </span>

          <h2>Latest Tracking Guides</h2>

          <p>
            Explore helpful tracking guides, delivery information,
            and courier-specific resources.
          </p>
        </div>

        <Link href="/guides" className={styles.readLink}>
          View All Guides →
        </Link>
      </div>

      <div className={styles.grid}>
        {articles.map((article) => {
          const courier = couriers.find(
            (item) => item.id === article.courierId
          );

          const courierName = courier?.name || "Courier Guide";
          const articleUrl =
            `/guides/${article.courierId}/${article.slug}`;

          return (
            <article
              className={styles.articleCard}
              key={article._id}
            >
              <Link
                href={articleUrl}
                className={styles.thumbnailWrap}
                aria-label={`Read ${article.title}`}
              >
                {article.mainImage?.asset?.url ? (
                  <img
                    src={article.mainImage.asset.url}
                    alt={
                      article.mainImage.alt ||
                      `Featured image for ${article.title}`
                    }
                    className={styles.thumbnail}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.thumbnailPlaceholder}>
                    <span>{courierName}</span>
                    <span>Tracking Guide</span>
                  </div>
                )}
              </Link>

              <div className={styles.articleCardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.categoryTag}>
                    {courierName}
                  </span>

                  <span className={styles.articleDate}>
                    {formatDate(article.publishedAt)}
                  </span>
                </div>

                <h3 className={styles.articleTitle}>
                  <Link href={articleUrl}>
                    {article.title}
                  </Link>
                </h3>

                {article.excerpt && (
                  <p className={styles.articleExcerpt}>
                    {article.excerpt}
                  </p>
                )}

                <div className={styles.articleCardFooter}>
                  <Link
                    href={articleUrl}
                    className={styles.readLink}
                  >
                    Read Guide <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
