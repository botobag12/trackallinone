
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
  publishedAt
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

      {/* Published articles */}
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
              <article className={styles.card} key={article._id}>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryTag}>
                      {courier.name}
                    </span>
                  </div>

                  <h3>{article.title}</h3>

                  {article.excerpt && (
                    <p className={styles.excerpt}>
                      {article.excerpt}
                    </p>
                  )}

                  <p className={styles.excerpt}>
                    Published {formatDate(article.publishedAt)}
                  </p>

                  <Link
                    href={`/guides/${courier.id}/${article.slug}`}
                    className={styles.readLink}
                  >
                    Read guide <span aria-hidden="true">→</span>
                  </Link>
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

        {/* Official website and country — at the bottom */}
        <section
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
          }}
        >
          <span className={styles.sectionEyebrow}>
            OFFICIAL COURIER RESOURCE
          </span>

          <h2 style={{ marginTop: "0.5rem" }}>
            {courier.name} Official Website
          </h2>

          <p style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
            Country or service region: {courier.country}
          </p>

          <a
            href={officialTrackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Visit official tracking website
            <span aria-hidden="true"> ↗</span>
          </a>
        </section>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/guides" className={styles.readLink}>
            ← Back to all courier guides
          </Link>
        </div>
      </section>
    </main>
  );
}
