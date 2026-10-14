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
    asset->{ url },
    alt
  },
  publishedAt,
  updatedAt,
  seoTitle,
  seoDescription,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "asset": asset->{
        url
      }
    }
  },
  author->{ name },
  categories[]->{ title, "slug": slug.current }
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

  const title = article.seoTitle || `${article.title} | TrackAllInOne`;
  const description =
    article.seoDescription ||
    article.excerpt ||
    `Read this ${courier.name} guide on TrackAllInOne.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      ...(article.mainImage?.asset?.url && {
        images: [
          {
            url: article.mainImage.asset.url,
            alt: article.mainImage.alt || article.title,
          },
        ],
      }),
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?.url;

      if (!imageUrl) return null;

      return (
        <figure className={styles.articleInlineImage}>
          <img
            src={imageUrl}
            alt={value.alt || "Article image"}
            loading="lazy"
          />

          {value.alt && (
            <figcaption>{value.alt}</figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    h2: ({ children }) => (
      <h2 className={styles.articleH2}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={styles.articleH3}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className={styles.articleQuote}>
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className={styles.articleList}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className={styles.articleList}>{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = /^https?:\/\//i.test(href);

      return (
        <a
          href={href}
          className={styles.articleLink}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function ArticlePage({ params }) {
  const { courier: courierId, slug } = await params;
  const courier = couriers.find((item) => item.id === courierId);

  if (!courier) notFound();

  const article = await getArticle(courierId, slug);

  if (!article) notFound();

  const imageUrl = article.mainImage?.asset?.url;

  return (
    <main className={styles.articlePage}>
      <div className={styles.articleContainer}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/guides">Guides</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/guides/${courier.id}`}>{courier.name}</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>
            {article.title}
          </span>
        </nav>

        <header className={styles.articleHeader}>
          <span className={styles.articleEyebrow}>
            {courier.name} TRACKING GUIDE
          </span>

          <h1 className={styles.articleTitle}>{article.title}</h1>

          {article.excerpt && (
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
          )}

          <div className={styles.articleMeta}>
            {article.author?.name && (
              <span>By {article.author.name}</span>
            )}

            {article.publishedAt && (
              <span>Published {formatDate(article.publishedAt)}</span>
            )}

            {article.updatedAt && (
              <span>Updated {formatDate(article.updatedAt)}</span>
            )}
          </div>
        </header>

        {imageUrl && (
          <figure className={styles.articleFeatured}>
            <img
              src={imageUrl}
              alt={article.mainImage?.alt || article.title}
            />
          </figure>
        )}

        <div className={styles.articleLayout}>
          <div className={styles.articleBody}>
            {article.body && (
              <PortableText
                value={article.body}
                components={portableTextComponents}
              />
            )}
          </div>

          <aside className={styles.articleSidebar}>
            <span className={styles.sidebarEyebrow}>KEEP EXPLORING</span>

            <h2>More {courier.name} information</h2>

            <p>
              Explore more tracking guides and helpful information
              about {courier.name}.
            </p>

            <Link
              href={`/guides/${courier.id}`}
              className={styles.sidebarButton}
            >
              More {courier.name} guides →
            </Link>

            <Link href="/guides" className={styles.sidebarTextLink}>
              Browse all tracking guides
            </Link>
          </aside>
        </div>

        <div className={styles.articleBottomNav}>
          <Link
            href={`/guides/${courier.id}`}
            className={styles.readLink}
          >
            ← More {courier.name} guides
          </Link>

          <Link href="/guides" className={styles.readLink}>
            All tracking guides →
          </Link>
        </div>
      </div>
    </main>
  );
}