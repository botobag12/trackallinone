
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../sanity/lib/client";
import couriers from "../../../data/couriers";
import styles from "../guides.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";

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

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: courier.name },
        ]}
      />

    
{/* Courier hero banner with overlaid heading */}
<section className="relative isolate mx-auto mt-6 min-h-[340px] w-full max-w-7xl overflow-hidden rounded-2xl bg-[#211D1A] sm:min-h-[400px] lg:min-h-[440px]">

  <Image
    src={`/images/couriers/${courier.id}.webp`}
    alt={`${courier.name} courier delivery illustration`}
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* Gradient for text readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#211D1A]/95 via-[#211D1A]/75 to-[#211D1A]/10" />

  {/* Existing courier heading */}
  <div className="relative z-10 flex min-h-[340px] max-w-2xl flex-col justify-center px-6 py-12 sm:min-h-[400px] sm:px-10 lg:min-h-[440px] lg:px-14">

    <span className="mb-4 text-xs font-bold tracking-[0.2em] text-[#E7B9A4]">
      TRACKALLINONE COURIER GUIDES
    </span>

    <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
      {courier.name}
      <br />
      <span className="text-[#F2C6A9]">
        Tracking Guides and Help
      </span>
    </h1>

    <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
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

        {/* Back to all courier guides */}
        <div className={styles.backLink}>
          <Link href="/guides" className={styles.readLink}>
            ← Back to all courier guides
          </Link>
        </div>
      </section>
    </main>
  );
}
