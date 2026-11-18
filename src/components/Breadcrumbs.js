
import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...items,
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 && (
                <span className="text-[#A99B8C]" aria-hidden="true">
                  /
                </span>
              )}

              {isLast ? (
                <span
                  className="font-medium text-[#211D1A]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#8A1717] transition-colors hover:text-[#5F1010] hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
