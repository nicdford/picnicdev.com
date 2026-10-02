// Anty, Nic's helper at the stand. Drawn in the hero tiles' screenprint
// grammar: flat poster inks inside thick ink outlines. Seen from the chest up,
// so the stand's counter can run across the bottom edge.
//
// `mood` swaps the pose: "wave" to greet, "write" while a line goes onto the
// ticket, "point" at the ticket while it's reviewed, "happy" once it's sent,
// anything else for idle. The few moves live in globals.css (ANTY) and switch
// off under reduced motion.

const INK = "#161311";
const RED = "#e8461e";
const YELLOW = "#f4bd1e";
const PINK = "#f2b3cb";
const WHITE = "#fffdf6";
const BLUE = "#2b5fd0";

export default function Anty({ mood = "idle", className = "" }) {
  const happy = mood === "happy";
  return (
    <svg
      className={`anty ${className}`.trim()}
      data-mood={mood}
      viewBox="0 0 160 160"
      fill="none"
      stroke={INK}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* thorax, cut off by the counter */}
      <ellipse cx="80" cy="140" rx="31" ry="26" fill={RED} />

      {/* left arm: resting on the counter, or raised to wave */}
      {mood === "wave" ? (
        <g className="anty-arm-wave">
          <path d="M56 128 Q38 120 31 98" />
          <circle cx="30" cy="94" r="7.5" fill={RED} strokeWidth="4" />
        </g>
      ) : (
        <g className="anty-arm-rest">
          <path d="M56 132 Q42 140 39 152" />
          <circle cx="39" cy="153" r="7.5" fill={RED} strokeWidth="4" />
        </g>
      )}

      {/* right arm with the pencil */}
      <g className="anty-arm-pencil">
        <path d="M104 132 Q120 132 124 146" />
        <g transform="translate(125 148) rotate(32)">
          <path d="M-5 -40 h10 v8 h-10 Z" fill={PINK} strokeWidth="3.5" />
          <path d="M-5 -32 h10 v24 h-10 Z" fill={YELLOW} strokeWidth="3.5" />
          <path d="M-5 -8 L5 -8 L0 5 Z" fill={WHITE} strokeWidth="3.5" />
          <path d="M-1.6 0.8 L1.6 0.8 L0 5 Z" fill={INK} stroke="none" />
        </g>
        <circle cx="124" cy="147" r="7.5" fill={RED} strokeWidth="4" />
      </g>

      <g className="anty-head">
        {/* antennae, elbowed like a real ant's, tipped with yellow */}
        <g className="anty-antennae">
          <path d="M68 40 L58 20 L40 15" />
          <path d="M92 40 L102 20 L120 15" />
          <circle cx="38" cy="14.5" r="7" fill={YELLOW} strokeWidth="4" />
          <circle cx="122" cy="14.5" r="7" fill={YELLOW} strokeWidth="4" />
        </g>

        <ellipse cx="80" cy="74" rx="47" ry="42" fill={RED} />

        <g stroke="none">
          <ellipse cx="50" cy="92" rx="7.5" ry="4.5" fill={PINK} />
          <ellipse cx="110" cy="92" rx="7.5" ry="4.5" fill={PINK} />
        </g>

        {happy ? (
          <g strokeWidth="5">
            <path d="M52 76 Q63 63 74 76" />
            <path d="M86 76 Q97 63 108 76" />
          </g>
        ) : (
          <g>
            <g className="anty-eye">
              <ellipse cx="63" cy="72" rx="12.5" ry="14.5" fill={WHITE} strokeWidth="4" />
              <circle cx="66" cy="75" r="6.5" fill={INK} stroke="none" />
              <circle cx="68.4" cy="71.6" r="2.2" fill={WHITE} stroke="none" />
            </g>
            <g className="anty-eye">
              <ellipse cx="97" cy="72" rx="12.5" ry="14.5" fill={WHITE} strokeWidth="4" />
              <circle cx="100" cy="75" r="6.5" fill={INK} stroke="none" />
              <circle cx="102.4" cy="71.6" r="2.2" fill={WHITE} stroke="none" />
            </g>
          </g>
        )}

        {happy ? (
          <path d="M68 94 Q80 110 92 94 Z" fill={INK} strokeWidth="4" />
        ) : (
          <path d="M71 96 Q80 104 89 96" strokeWidth="4.5" />
        )}
      </g>

      {/* a stand-worker's bow tie under the chin */}
      <g strokeWidth="3.5">
        <path d="M80 119 L64 110.5 Q61.5 119 64 127.5 Z" fill={BLUE} />
        <path d="M80 119 L96 110.5 Q98.5 119 96 127.5 Z" fill={BLUE} />
        <rect x="75" y="114.5" width="10" height="9" rx="3" fill={BLUE} />
      </g>
    </svg>
  );
}
