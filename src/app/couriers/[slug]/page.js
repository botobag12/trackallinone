
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import couriers from "@/data/couriers";
import { client } from "@/sanity/lib/client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "../../guides/guides.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return couriers.map((courier) => ({
    slug: courier.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const courier = couriers.find((item) => item.id === slug);

  if (!courier) {
    return {
      title: "Courier Not Found | TrackAllInOne",
      description:
        "The requested courier tracking page could not be found.",
    };
  }

  const title = `${courier.name} Tracking | TrackAllInOne`;

  const description =
    `Learn about ${courier.name} tracking, find your shipment number, ` +
    "and use the TrackAllInOne homepage tracking tool where supported.";

  const canonicalUrl =
    `https://www.trackallinone.com/couriers/${courier.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "TrackAllInOne",
      type: "website",
      images: [
        {
          url: "/TRACK.png",
          width: 1200,
          height: 630,
          alt: `${courier.name} Tracking - TrackAllInOne`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/TRACK.png"],
    },
  };
}

// Fetch the latest three published articles for this courier.
const ARTICLES_QUERY = `*[
  _type == "post" &&
  courierId == $courierId &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(publishedAt desc)[0...3] {
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
  return client.fetch(
    ARTICLES_QUERY,
    { courierId },
    { next: { revalidate: 60 } }
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function CourierPage({ params }) {
  const { slug } = await params;

  const courier = couriers.find((item) => item.id === slug);

  if (!courier) {
    notFound();
  }

  const articles = await getCourierArticles(courier.id);

  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />
<Breadcrumbs
  items={[
    { label: "Couriers", href: "/couriers" },
    { label: courier.name },
  ]}
/>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/couriers"
            className="font-medium text-[#7A1717] transition hover:text-[#941F1F]"
          >
            ← All Couriers
          </Link>

          <div className="mt-8 rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-12">
    <div className="mb-8 w-full overflow-hidden rounded-2xl">
  <Image
    src={`/images/couriers/${courier.id}.webp`}
    alt={`${courier.name} courier delivery banner`}
    width={1600}
    height={900}
    priority
    sizes="(max-width: 768px) 100vw, 1200px"
    className="h-auto w-full"
  />
</div>
          <p className="font-semibold uppercase tracking-[0.15em] text-[#7A1717]">
              {courier.country}
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              {courier.name} Tracking
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#625B55]">
              Find information about {courier.name} shipments
              and return to TrackAllInOne to submit a tracking
              request for supported shipments.
            </p>

            <div className="mt-10 rounded-2xl bg-[#FFF8ED] p-6">
              <h2 className="text-2xl font-bold">
                Track Your Shipment
              </h2>

              <p className="mt-3 leading-7 text-[#625B55]">
                You can start a tracking request from the
                TrackAllInOne homepage. Enter your tracking number
                and select the appropriate courier if it is
                available in the tracking tool.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-xl bg-[#7A1717] px-7 py-4 font-bold text-white transition hover:bg-[#941F1F]"
              >
                Track on TrackAllInOne →
              </Link>

              <p className="mt-4 text-sm leading-6 text-[#625B55]">
                Live tracking availability depends on the courier
                and our tracking provider's coverage. A courier
                appearing in this directory does not guarantee
                that its shipments can be tracked through the
                homepage tool.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">
                About {courier.name} Tracking
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                A tracking number is a reference used to identify
                a shipment within a courier's tracking system.
                You can normally find it on a shipping receipt,
                order confirmation, email, SMS notification, or
                shipping label, depending on how the shipment was
                booked.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne provides courier information and a
                tracking tool for supported shipments. Available
                shipment statuses and tracking events depend on
                the information returned by the tracking provider.
                Results may be delayed, incomplete, or unavailable.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">
                How to Start Tracking a {courier.name} Shipment
              </h2>

              <ol className="mt-5 space-y-3 leading-7 text-[#625B55]">
                <li>
                  <span className="font-semibold text-[#111111]">
                    1.
                  </span>{" "}
                  Find your shipment tracking number on your
                  receipt, order confirmation, or shipping label.
                </li>

                <li>
                  <span className="font-semibold text-[#111111]">
                    2.
                  </span>{" "}
                  Return to the TrackAllInOne homepage using
                  the button above.
                </li>

                <li>
                  <span className="font-semibold text-[#111111]">
                    3.
                  </span>{" "}
                  Enter your tracking number and select the
                  matching courier if it is supported by the
                  tracking tool.
                </li>

                <li>
                  <span className="font-semibold text-[#111111]">
                    4.
                  </span>{" "}
                  Submit the request and review the shipment
                  information returned, if available.
                </li>
              </ol>

              <Link
                href="/"
                className="mt-6 inline-flex font-semibold text-[#7A1717] hover:underline"
              >
                Return to the TrackAllInOne homepage →
              </Link>
            </div>

            {/* Courier-specific published guides */}
            {articles.length > 0 && (
              <section className="mt-14 border-t border-[#E5DCD0] pt-10">
                <div className="mb-8">
                  <span className={styles.sectionEyebrow}>
                    COURIER-SPECIFIC ARTICLES
                  </span>

                  <h2 className="mt-2 text-2xl font-bold">
                    Latest {courier.name} Tracking Guides
                  </h2>

                  <p className="mt-3 leading-7 text-[#625B55]">
                    Explore our latest {courier.name} guides for
                    tracking information, delivery updates, and
                    helpful shipment advice.
                  </p>
                </div>

                <div className={styles.grid}>
                  {articles.map((article) => (
                    <article
                      className={styles.articleCard}
                      key={article._id}
                    >
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
                            Read Guide{" "}
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href={`/guides/${courier.id}`}
                    className="inline-flex font-semibold text-[#7A1717] transition hover:text-[#941F1F] hover:underline"
                  >
                    View All {courier.name} Guides →
                  </Link>
                </div>
              </section>
            )}

            <div className="mt-10 rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-5">
              <p className="text-sm leading-6 text-[#625B55]">
                TrackAllInOne is an independent tracking website
                and is not affiliated with {courier.name} unless
                expressly stated otherwise. Courier names and
                trademarks belong to their respective owners.
                TrackAllInOne does not guarantee shipment status
                or delivery times. For official confirmation,
                contact the relevant courier.
              </p>
            </div>
          </div>
        </div>
      </section>
      {courier.faqs?.length > 0 && (
  <section className="mt-12 rounded-2xl border border-[#E5DCD0] bg-white p-6 shadow-sm sm:p-8 md:p-10">
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#7A1717]">
        Frequently Asked Questions
      </p>

      <h2 className="mt-3 text-2xl font-bold text-[#211D1A] sm:text-3xl">
        {courier.name} Tracking FAQs
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#756B63]">
        Find answers to common questions about {courier.name} tracking,
        delivery updates, and shipment status.
      </p>

      <div className="mt-8 divide-y divide-[#E5DCD0]">
        {courier.faqs.map((faq, index) => (
          <details key={index} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#211D1A] marker:hidden">
              <span>{faq.question}</span>

              <span className="shrink-0 text-xl text-[#7A1717] transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-4 pr-6 text-sm leading-7 text-[#756B63]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
)}

      <Footer />
    </main>
  );
}
