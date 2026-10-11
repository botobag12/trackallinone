
import GuidesExplorer from "./GuidesExplorer";

export const metadata = {
  title: "Courier Tracking Guides | TrackAllInOne",
  description:
    "Explore courier tracking guides, understand shipment statuses, and learn how to track parcels with popular delivery services.",
  alternates: {
    canonical: "https://www.trackallinone.com/guides",
  },
  openGraph: {
    title: "Courier Tracking Guides | TrackAllInOne",
    description:
      "Helpful guides for parcel tracking and delivery updates.",
    url: "https://www.trackallinone.com/guides",
    type: "website",
  },
};

export default function GuidesPage() {
  return <GuidesExplorer />;
}
