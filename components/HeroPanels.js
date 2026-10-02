// Hero poster: Nic plus three flat-outline picnic-food tiles, drawn in the
// screenprint world (thick black outlines, flat poster inks). Shared by every
// audience home so the switcher never reshapes the first screen.

import Icon from "./Icon";

const S = "#161311"; // ink / outline

function Burger() {
  // Drawn back-to-front so the lettuce scallops overhang the cheese.
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={S} strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      {/* bottom bun */}
      <path d="M13 74 H87 V79 Q87 86 79 86 H21 Q13 86 13 79 Z" fill="#f4bd1e" />
      {/* tomato */}
      <path d="M14 66 H86 V74 H14 Z" fill="#e8461e" />
      {/* cheese */}
      <path d="M14 58 H86 V66 H14 Z" fill="#fffdf6" />
      {/* lettuce — even scallops along the bottom edge */}
      <path
        d="M12 46 H88 V53 Q81.7 64 75.3 53 Q69 64 62.7 53 Q56.3 64 50 53 Q43.7 64 37.3 53 Q31 64 24.7 53 Q18.3 64 12 53 Z"
        fill="#1f9b4b"
      />
      {/* top bun */}
      <path d="M12 46 C12 29 28 21 50 21 C72 21 88 29 88 46 Z" fill="#f4bd1e" />
      {/* sesame seeds — scattered, not paired (a pair reads as eyes) */}
      <g fill={S} stroke="none">
        <ellipse cx="33" cy="38" rx="2.3" ry="3.1" />
        <ellipse cx="45" cy="31" rx="2.3" ry="3.1" />
        <ellipse cx="58" cy="33" rx="2.3" ry="3.1" />
        <ellipse cx="69" cy="39" rx="2.3" ry="3.1" />
      </g>
    </svg>
  );
}

function Watermelon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={S} strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      {/* concentric half-discs sharing one flat top edge: rind, pith, flesh */}
      <path d="M10 30 A40 40 0 0 0 90 30 Z" fill="#1f9b4b" />
      <path d="M16 30 A34 34 0 0 0 84 30 Z" fill="#fffdf6" />
      <path d="M21 30 A29 29 0 0 0 79 30 Z" fill="#e8461e" />
      {/* seeds */}
      <g fill={S} stroke="none">
        <ellipse cx="38" cy="45" rx="2.8" ry="3.9" />
        <ellipse cx="50" cy="51" rx="2.8" ry="3.9" />
        <ellipse cx="62" cy="45" rx="2.8" ry="3.9" />
        <ellipse cx="46" cy="36" rx="2.8" ry="3.9" />
        <ellipse cx="58" cy="36" rx="2.8" ry="3.9" />
      </g>
    </svg>
  );
}

function Basket() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={S} strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      {/* handle */}
      <path d="M26 52c0-20 10-30 24-30s24 10 24 30" stroke="#161311" strokeWidth="6" fill="none" />
      {/* gingham cloth poking out */}
      <path d="M40 50l20 0-6 10-8 0-6-10Z" fill="#e8461e" />
      {/* basket body */}
      <path d="M18 50h64l-5 28c-1 4-4 6-8 6H31c-4 0-7-2-8-6l-5-28Z" fill="#f4bd1e" />
      {/* weave */}
      <path d="M31 50l-3 34M50 50v34M69 50l3 34" stroke="#161311" strokeWidth="3" />
      <path d="M21 62h58M23 74h54" stroke="#161311" strokeWidth="3" />
    </svg>
  );
}

export default function HeroPanels() {
  return (
    <div className="hero-poster">
      <div className="hp-tile hp-photo">
        <img
          src="/nic.jpg"
          alt="Nic Ford, founder and developer of picnicdev"
          width="800"
          height="800"
          fetchPriority="high"
        />
        <p className="hp-label">
          Hi, I&apos;m Nic <Icon name="wave" />
        </p>
      </div>
      <div className="hp-tile hp-food hp-blue">
        <Burger />
      </div>
      {/* yellow, not red — the melon's red flesh would vanish on a red ground */}
      <div className="hp-tile hp-food hp-yellow">
        <Watermelon />
      </div>
      <div className="hp-tile hp-food hp-green">
        <Basket />
      </div>
    </div>
  );
}
