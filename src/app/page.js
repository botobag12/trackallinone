import HomeClient from "./HomeClient";
import LatestGuides from "@/components/LatestGuides";

export default function HomePage() {
  return <HomeClient latestGuides={<LatestGuides />} />;
}