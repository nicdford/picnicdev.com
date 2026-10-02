import Icon from "./Icon";
import IntakeLink from "./intake/IntakeLink";

// Closing call to action: the red poster box on its gingham edge. The button
// opens Anty's ticket stand for whichever audience the page belongs to.
export default function CtaBand({ title, text, label, icon }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta-box">
          <div className="gingham blanket-top" aria-hidden="true" />
          <h2>{title}</h2>
          <p>{text}</p>
          <IntakeLink className="btn btn-yellow">
            {label} <Icon name={icon} />
          </IntakeLink>
        </div>
      </div>
    </section>
  );
}
