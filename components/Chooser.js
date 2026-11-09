import Link from "next/link";
import Icon from "./Icon";
import HeroPanels from "./HeroPanels";
import IntakeLink from "./intake/IntakeLink";
import { AUDIENCE_HOMES } from "./audiences";

// The front door: Nic, his promise, and one door per audience. The doors are
// this page's loud moment in place of pricing cards; each opens that
// audience's home, which carries the prices and the details.
const DOORS = [
  {
    id: "business",
    icon: "storefront",
    name: "A small business",
    line: "Websites from $500, with free hosting on static sites.",
    go: "See websites & prices",
  },
  {
    id: "org",
    icon: "hand",
    name: "A nonprofit or organization",
    line: "Monthly care plans from $50: hosting, upkeep, and help with changes.",
    go: "See care plans",
  },
  {
    id: "agency",
    icon: "handshake",
    name: "An agency",
    line: "White-label builds from your designs, under your brand.",
    go: "See the partner program",
  },
];

export default function Chooser() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Just me,
              <br />
              <span className="accent serif-italic">start to finish.</span>
            </h1>
            <p className="hero-lead">
              I&apos;m Nic, one experienced developer. I build fast, honestly
              priced websites, and I&apos;m the one you talk to from first hello
              to launch day and after. Tell me who you are and I&apos;ll show you
              what fits.
            </p>
          </div>
          <HeroPanels />
        </div>
      </section>

      <section className="section" aria-labelledby="doors-h">
        <div className="wrap">
          <h2 id="doors-h" className="doors-h">
            I&apos;m building for&hellip;
          </h2>
          <ul className="doors">
            {DOORS.map((d) => (
              <li key={d.id}>
                <Link className="door" data-role={d.id} href={AUDIENCE_HOMES[d.id]}>
                  <span className="door-mark" aria-hidden="true">
                    <Icon name={d.icon} />
                  </span>
                  <span className="door-name">{d.name}</span>
                  <span className="door-line">{d.line}</span>
                  <span className="door-go">
                    {d.go} <Icon name="next" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="fineprint doors-foot">
            Not sure which?{" "}
            <IntakeLink className="text-link">Tell me about your project</IntakeLink>{" "}
            and I&apos;ll point you the right way.
          </p>
        </div>
      </section>
    </>
  );
}
