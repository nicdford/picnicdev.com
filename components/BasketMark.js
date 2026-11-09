// The picnicdev mark: a lidded wicker basket with a gingham napkin tucked
// under the lid, in poster inks with ink outlines. The page supplies the red
// tile (.brand .dot, .landing-mark). app/icon.svg is the same drawing on its
// own tile, so change the two together.
const INK = "#161311";
const YELLOW = "#f4bd1e";
const RED = "#e8461e";
const CREAM = "#fffdf6";

const HANDLE = "M8.5 14V12C8.5 4.5 23.5 4.5 23.5 12V14";
const BODY = "M6.5 17h19l-1.6 8.4a2 2 0 0 1-2 1.6H10.1a2 2 0 0 1-2-1.6L6.5 17Z";
const NAPKIN = "M7 16.6H25L16 24.2Z";
// The napkin's red checks, laid along its slanted edges and cut to them, so
// the drawing needs no clipPath or pattern ids.
const CHECKS =
  "M7 16.6L9.25 18.5L11.5 16.6ZM11.5 20.4L13.75 22.3L16 20.4L13.75 18.5ZM11.5 16.6L13.75 18.5L16 16.6Z" +
  "M16 20.4L18.25 22.3L20.5 20.4L18.25 18.5ZM16 16.6L18.25 18.5L20.5 16.6ZM20.5 16.6L22.75 18.5L25 16.6Z";

export default function BasketMark({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="3.9 3.8 24.2 24.2"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={HANDLE} stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d={HANDLE} stroke={YELLOW} strokeWidth="2" strokeLinecap="round" />
      <path d={BODY} fill={YELLOW} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d={NAPKIN} fill={CREAM} />
      <path d={CHECKS} fill={RED} />
      <path d={NAPKIN} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="5" y="12.5" width="22" height="4.5" rx="2.25" fill={YELLOW} stroke={INK} strokeWidth="1.8" />
    </svg>
  );
}
