
"use client";

import { useEffect, useState } from "react";
import styles from "../../guides.module.css";

export default function ArticleTableOfContents({ items }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!items?.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleEntries.length) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items]);

  if (!items?.length) return null;

  return (
    <nav
      className={styles.toc}
      aria-label="Table of contents"
    >
      <p className={styles.tocEyebrow}>IN THIS GUIDE</p>

      <h2 className={styles.tocTitle}>Table of Contents</h2>

      <ol className={styles.tocList}>
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item.level === 3
                ? styles.tocSubItem
                : styles.tocItem
            }
          >
            <a
              href={`#${item.id}`}
              className={`${styles.tocLink} ${
                activeId === item.id ? styles.tocActive : ""
              }`}
              aria-current={
                activeId === item.id ? "location" : undefined
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
