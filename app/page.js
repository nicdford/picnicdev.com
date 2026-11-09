import Chooser from "@/components/Chooser";
import Landing from "@/components/Landing";
import { CONTACT_EMAIL } from "@/lib/contact";

// The GitHub Pages export (PAGES_EXPORT) can only serve this page, so it keeps
// the holding card. Everywhere else / is the front door to the three homes.
const HOLDING = !!process.env.PAGES_EXPORT;

export const metadata = HOLDING
  ? {
      title: { absolute: "picnicdev — friendly web development" },
      description: `picnicdev builds fast, affordable websites. Say hi at ${CONTACT_EMAIL}.`,
    }
  : {
      title: { absolute: "picnicdev — one friendly developer, start to finish" },
      description:
        "picnicdev is Nic, one experienced developer who builds fast, honestly priced websites for small businesses, care plans for organizations, and white-label builds for agencies.",
      alternates: { canonical: "/" },
    };

export default function Home() {
  return HOLDING ? <Landing /> : <Chooser />;
}
