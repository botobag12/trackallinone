"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import couriers from "../../data/couriers";
import styles from "./guides.module.css";

function getInitials(name) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function GuidesExplorer() {
  const [search, setSearch] = useState("");

  const filteredCouriers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return couriers.filter((courier) => {
      return (
        !query ||
        `${courier.name} ${courier.country} ${courier.id}`
          .toLowerCase()
          .includes(query)
      );
    });
  }, [search]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            TRACKALLINONE RESOURCE CENTRE
          </span>

          <h1>
            Courier Guides
            <br />
            <span>Information for Every Courier</span>
          </h1>

          <p className={styles.heroText}>
            Choose your courier to explore relevant tracking instructions,
            delivery information, and helpful articles specific to that service.
          </p>

          <form
            className={styles.searchBox}
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <span className={styles.searchIcon} aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              aria-label="Search couriers"
              placeholder="Search by courier name or country..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </form>

          <div className={styles.heroNote}>
            <span aria-hidden="true">✓</span> Courier-specific information
            <span aria-hidden="true">✓</span> Official resources where relevant
          </div>
        </div>

        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.orbit}>
            <div className={styles.packageIcon}>📦</div>
            <div className={styles.orbitDot}>↗</div>
            <div className={styles.orbitLabel}>TRACK • LEARN • DELIVER</div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              BROWSE BY COURIER
            </span>
            <h2>Choose your courier</h2>
            <p>
              Each courier has its own services, tracking process, and delivery
              information. Select one to explore its guides.
            </p>
          </div>

          <span className={styles.resultCount}>
            {filteredCouriers.length}{" "}
            {filteredCouriers.length === 1 ? "courier" : "couriers"}
          </span>
        </div>

        {filteredCouriers.length > 0 ? (
          <div className={styles.grid}>
            {filteredCouriers.map((courier, index) => (
              <article className={styles.card} key={courier.id}>
                <div
                  className={`${styles.cardVisual} ${
                    styles[`visual${(index % 3) + 1}`]
                  }`}
                >
                  <span className={styles.courierMark}>
                    {getInitials(courier.name)}
                  </span>

                  <span className={styles.visualLabel}>
                    COURIER INFORMATION
                  </span>

                  <span className={styles.packageDecoration}>▧</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryTag}>
                      {courier.country}
                    </span>
                  </div>

                  <h3>{courier.name}</h3>

                  <p className={styles.excerpt}>
                    Explore tracking guidance and information relevant to{" "}
                    {courier.name}.
                  </p>

                  <Link
                    href={`/guides/${courier.id}`}
                    className={styles.readLink}
                    aria-label={`Explore ${courier.name} guides`}
                  >
                    Explore guides <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>⌕</span>
            <h3>No couriers found</h3>
            <p>
              Check the spelling or try searching by a different country.
            </p>

            <button
              type="button"
              className={styles.resetButton}
              onClick={() => setSearch("")}
            >
              Show all couriers
            </button>
          </div>
        )}
      </section>

      <section className={styles.helpBanner}>
        <div>
          <span className={styles.sectionEyebrow}>
            READY TO TRACK?
          </span>
          <h2>Continue to your courier's tracking service.</h2>
          <p>
            Use TrackAllInOne to find your courier and continue to its
            tracking website.
          </p>
        </div>

        <Link href="/couriers" className={styles.ctaButton}>
          Track a parcel <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}