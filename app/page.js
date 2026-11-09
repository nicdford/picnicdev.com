import Chooser from "@/components/Chooser";

export const metadata = {
  title: { absolute: "picnicdev — one friendly developer, start to finish" },
  description:
    "picnicdev is Nic, one experienced developer who builds fast, honestly priced websites for small businesses, care plans for organizations, and white-label builds for agencies.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <Chooser />;
}
