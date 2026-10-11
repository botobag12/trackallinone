
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import couriers from "../../../../data/couriers";
import styles from "../../guides.module.css";

const ARTICLE_QUERY = `*[
  _type == "post" &&
  courierId == $courierId &&
  slug.current == $slug &&
  defined(publishedAt) &&
  publishedAt <= now()
][0] {
  _id,
  title,
  "slug": slug.current,
  courierId,
  excerpt,
  mainImage {
    asset-> {
      url
    },
    alt
  },
  publishedAt,
  updatedAt,
  seoTitle,
  seoDescription,
  body,
  author-> {
    name
  },
  categories[]-> {
    title,
    "slug": slug.current
  }
}`;

async function getArticle(courierId, slug) {
  return client.fetch(ARTICLE_QUERY, { courierId, slug });
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({ params }) {
  const { courier: courierId, slug } = await params;

  const courier = couriers.find((item) => item.id === courierId);

  if (!courier) {
    return { title: "Article Not Found | TrackAllInOne" };
  }

  const article = await getArticle(courierId, slug);

  if (!article) {
    return { title: "Article Not Found | TrackAllInOne" };
  }

  const canonical =
    `https://www.trackallinone.com/guides/${courierId}/${article.slug}`;

  return {
    title: article.seoTitle || `${article.title} | TrackAllInOne`,
    description:
      article.seoDescription ||
      article.excerpt ||
      `Read this ${courier.name} guide on TrackAllInOne.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt || "",
      url: canonical,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      ...(article.mainImage?.asset?.url
        ? {
            images: [
              {
                url: article.mainImage.asset.url,
                alt: article.mainImage.alt || article.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { courier: courierId, slug } = await params;

  const courier = couriers.find((item) => item.id === courierId);

  if (!courier) {
    notFound();
  }

  const article = await getArticle(courierId, slug);

  if (!article) {
    notFound();
  }

  const imageUrl = article.mainImage?.asset?.url;

  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <nav
          aria-label="Breadcrumb"
          style={{ marginBottom: "1.5rem" }}
        >
          <Link href="/guides" className={styles.readLink}>
            All guides
          </Link>
          {" / "}
          <Link
            href={`/guides/${courier.id}`}
            className={styles.readLink}
          >
            {courier.name}
          </Link>
          {" / "}
          <span>{article.title}</span>
        </nav>

        <header
          style={{
            maxWidth: "850px",
            margin: "0 auto 2rem",
          }}
        >
          <span className={styles.sectionEyebrow}>
            {courier.name} GUIDE
          </span>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginTop: "1rem",
            }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p
              className={styles.heroText}
              style={{ marginTop: "1rem" }}
            >
              {article.excerpt}
            </p>
          )}

          <p style={{ marginTop: "1rem" }}>
            {article.author?.name && (
              <>By {article.author.name} · </>
            )}
            Published {formatDate(article.publishedAt)}
            {article.updatedAt && (
              <> · Updated {formatDate(article.updatedAt)}</>
            )}
          </p>
        </header>

        {imageUrl && (
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto 2rem",
            }}
          >
            <img
              src={imageUrl}
              alt={article.mainImage?.alt || article.title}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                aspectRatio: "16 / 9",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        )}

        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            lineHeight: 1.85,
            overflowWrap: "anywhere",
          }}
        >
          {article.body && (
            <PortableText value={article.body} />
          )}
        </div>

        <section
          style={{
            maxWidth: "850px",
            margin: "3rem auto 0",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e5e5e5",
          }}
        >
          <h2>More {courier.name} information</h2>

          <p>
            Explore more articles about {courier.name}, or visit the
            courier guide page for its official tracking resource.
          </p>

          <div style={{ marginTop: "1rem" }}>
            <Link
              href={`/guides/${courier.id}`}
              className={styles.readLink}
            >
              More {courier.name} guides →
            </Link>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Link href="/guides" className={styles.readLink}>
              ← Browse all couriers
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
