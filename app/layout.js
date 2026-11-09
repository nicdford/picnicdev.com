import { Rubik, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AudienceProvider } from "@/components/AudienceProvider";
import { IntakeProvider } from "@/components/intake/IntakeProvider";
import { AUDIENCE_HOMES } from "@/components/audiences";

// Runs before paint: resolves the audience from the URL (home routes) or the
// saved preference and stamps <html data-audience> so there's no flash of the
// wrong content set.
const noFlash = `(function(){try{var homes=${JSON.stringify(AUDIENCE_HOMES)};var p=location.pathname;var a=null;for(var k in homes){if(homes[k]===p)a=k;}if(a){localStorage.setItem('pd-audience',a);}else{a=localStorage.getItem('pd-audience');if(!homes[a])a='business';}document.documentElement.dataset.audience=a;}catch(e){document.documentElement.dataset.audience='business';}})();`;

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-rubik",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://picnicdev.com"),
  title: {
    default: "picnicdev — friendly web development for small businesses, organizations & agencies",
    template: "%s · picnicdev",
  },
  description:
    "picnicdev builds fast, affordable websites — from $500 static sites with free hosting to custom WordPress and application development. Monthly care plans for nonprofits and local organizations, plus a white-label agency partner program.",
  keywords: [
    "web development",
    "small business website",
    "static website",
    "WordPress development",
    "agency partner",
    "white label development",
    "nonprofit website",
    "website maintenance plan",
    "fly.io deployment",
  ],
  openGraph: {
    title: "picnicdev — friendly web development",
    description:
      "Fast, affordable websites for small businesses, plus a white-label agency partner program.",
    url: "https://picnicdev.com",
    siteName: "picnicdev",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-audience="business"
      suppressHydrationWarning
      className={`${rubik.variable} ${nunito.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        <AudienceProvider>
          <IntakeProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </IntakeProvider>
        </AudienceProvider>
      </body>
    </html>
  );
}
