// Hero poster: Nic, and the town he works from. The Boise Depot is printed in
// cobalt poster ink; Nic's headshot overlaps it in full color, so the person
// is the one thing on the poster in his true colors. Shared by every audience
// home so the switcher never reshapes the first screen.

import Icon from "./Icon";

export default function HeroPanels() {
  return (
    <figure className="prints prints--hero">
      <div className="prints-stack">
        <img
          className="print print--tall"
          src="/photos/boise-depot-600.webp"
          srcSet="/photos/boise-depot-600.webp 600w, /photos/boise-depot.webp 960w"
          sizes="(max-width: 900px) 62vw, 320px"
          width="960"
          height="1200"
          alt="The Boise Depot clock tower against a cloudy sky"
          fetchPriority="high"
        />
        <div className="print print--wide print--portrait">
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
      </div>
      <figcaption className="prints-caption">
        <Icon name="pin" /> Based in Boise, Idaho. Working with clients anywhere.
      </figcaption>
    </figure>
  );
}
