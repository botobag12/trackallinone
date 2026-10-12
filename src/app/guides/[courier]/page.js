import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import couriers from "../../../data/couriers";
import styles from "../guides.module.css";

const ARTICLES_QUERY = `*[
  _type == "post" &&
  courierId == $courierId &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage {
    alt,
    asset-> {
      url
    }
  }
}`;

async function getCourierArticles(courierId) {
  return client.fetch(ARTICLES_QUERY, { courierId });
}

function getOfficialTrackingUrl(courier) {
  return courier.trackingUrl.replace("{trackingNumber}", "");
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({ params }) {
  const { courier: courierId } = await params;
  const courier = couriers.find((item) => item.id === courierId);

  if (!courier) {
    return { title: "Courier Not Found | TrackAllInOne" };
  }

  const articles = await getCourierArticles(courier.id);

  return {
    title: `${courier.name} Tracking Guides and Help | TrackAllInOne`,
    description: `Explore ${courier.name} tracking guidance, courier-specific articles, and official tracking resources.`,
    alternates: {
      canonical: `https://www.trackallinone.com/guides/${courier.id}`,
    },
    robots: {
      index: articles.length > 0,
      follow: true,
    },
  };
}

export default async function CourierGuidePage({ params }) {
  const { courier: courierId } = await params;
  const courier = couriers.find((item) => item.id === courierId);

  if (!courier) {
    notFound();
  }

  const articles = await getCourierArticles(courier.id);
  const officialTrackingUrl = getOfficialTrackingUrl(courier);

  return (
    <main className={styles.page}>
      {/* Courier heading */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            TRACKALLINONE COURIER GUIDES
          </span>

          <h1>
            {courier.name}
            <br />
            <span>Tracking Guides and Help</span>
          </h1>

          <p className={styles.heroText}>
            Explore our published {courier.name} guides to learn about
            tracking, delivery information, and other courier-specific topics.
          </p>
        </div>
      </section>

      {/* Published article cards */}
      <section className={styles.content}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              COURIER-SPECIFIC ARTICLES
            </span>

            <h2>{courier.name} guides</h2>

            <p>
              Browse articles published specifically for {courier.name}.
            </p>
          </div>

          <span className={styles.resultCount}>
            {articles.length}{" "}
            {articles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {articles.length > 0 ? (
          <div className={styles.grid}>
            {articles.map((article) => (
              <article
                className={styles.articleCard}
                key={article._id}
              >
                {/* Featured image thumbnail */}
                <Link
                  href={`/guides/${courier.id}/${article.slug}`}
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
                      <span>{courier.name}</span>
                      <span>Tracking Guide</span>
                    </div>
                  )}
                </Link>

                {/* Article information */}
                <div className={styles.articleCardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryTag}>
                      {courier.name}
                    </span>

                    <span className={styles.articleDate}>
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>

                  <h3 className={styles.articleTitle}>
                    <Link
                      href={`/guides/${courier.id}/${article.slug}`}
                    >
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
                      href={`/guides/${courier.id}/${article.slug}`}
                      className={styles.readLink}
                    >
                      Read Guide <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>Guides are being prepared</h3>
            <p>
              No articles have been published for {courier.name} yet.
              Please check back as new guides become available.
            </p>
          </div>
        )}

        {/* Official courier resource */}
       
        <div className={styles.backLink}>
          <Link href="/guides" className={styles.readLink}>
            ← Back to all courier guides
          </Link>
        </div>
      </section>
    </main>
  );
}