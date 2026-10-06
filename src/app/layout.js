
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.trackallinone.com"),

  title: {
    default: "TrackAllInOne - Universal Shipment Tracking",
    template: "%s | TrackAllInOne",
  },

  description:
    "Track shipments from major courier and postal services worldwide. Select your courier, enter your tracking number, and get official tracking updates.",

  keywords: [
    "shipment tracking",
    "package tracking",
    "parcel tracking",
    "courier tracking",
    "TCS tracking",
    "DHL tracking",
    "FedEx tracking",
    "UPS tracking",
    "Leopards Courier tracking",
    "USPS tracking",
    "Royal Mail tracking",
    "Canada Post tracking",
  ],

  authors: [
    {
      name: "TrackAllInOne",
    },
  ],

  creator: "TrackAllInOne",
  publisher: "TrackAllInOne",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "TrackAllInOne - Universal Shipment Tracking",
    description:
      "Track shipments from major courier and postal services worldwide from one convenient place.",
    url: "https://www.trackallinone.com",
    siteName: "TrackAllInOne",
    type: "website",
    images: [
      {
        url: "/TRACK.png",
        width: 1200,
        height: 630,
        alt: "TrackAllInOne - Universal Shipment Tracking",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TrackAllInOne - Universal Shipment Tracking",
    description:
      "Track shipments from major courier and postal services worldwide.",
    images: ["/TRACK.png"],
  },

  alternates: {
    canonical: "https://www.trackallinone.com",
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.trackallinone.com/#website",
        url: "https://www.trackallinone.com",
        name: "TrackAllInOne",
        description:
          "Universal shipment tracking for major courier and postal services.",
      },

      {
        "@type": "Organization",
        "@id": "https://www.trackallinone.com/#organization",
        name: "TrackAllInOne",
        url: "https://www.trackallinone.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.trackallinone.com/TRACK.png",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {children}
      </body>
    </html>
  );
}
