"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Anty from "./Anty";
import Ticket from "./Ticket";
import Icon from "../Icon";
import {
  ANT_NAME,
  NIC_EMAIL,
  REACH,
  activeSteps,
  askedSteps,
  flowFor,
  idOf,
  optionsOf,
  tierKey,
  ticketLines,
  ticketSummary,
} from "./script";

/**
 * Anty's ticket stand: the project intake. Anty asks one thing at a time on
 * the counter side; every answer is written onto the ticket on the blue board,
 * and the finished ticket is sent to Nic. Rendered inside the modal
 * (IntakeProvider) or inline on /contact (`mode="page"`).
 */

const DRAFT_KEY = "pd-ticket-draft";
const DRAFT_TTL = 30 * 24 * 60 * 60 * 1000;
// same rule as the API (app/api/intake/route.js), so the server never refuses a ticket the stand accepted
const EMAIL_RE = /^[^\s@?&#/\\"<>,;:()[\]]+@[^\s@?&#/\\"<>,;:()[\]]+\.[^\s@?&#/\\"<>,;:()[\]]{2,}$/;
const NOT_ASKED = new Set(["passive", "review"]); // steps an edit never needs to revisit

const FOOTERS = {
  build: "Not an order. Nothing is bought here: Nic replies with a plan and a flat price.",
  partner: "Not an agreement. Nic replies with how he'd work with you and his rates.",
  plan: "Not a sign-up. Nic replies with a recommendation and a flat monthly price.",
};

function readDraft(key) {
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (!d || d.key !== key || Date.now() - d.savedAt > DRAFT_TTL) return null;
    return d;
  } catch {
    return null;
  }
}
function writeDraft(d) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...d, savedAt: Date.now() }));
  } catch {
    /* private mode or storage full: the ticket just won't resume */
  }
}
function dropDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* nothing to drop */
  }
}

const firstName = (a) => (a.name || "").trim().split(/\s+/)[0] || "";
const today = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

/** Anty's lines mark stressed phrases with *stars*. */
function Say({ text }) {
  return String(text)
    .split("*")
    .map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

export default function Intake({ entry, mode = "dialog", titleId = "intake-title", onClose }) {
  const flow = useMemo(() => flowFor(entry), [entry]);

  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(null);
  const [trail, setTrail] = useState([]);
  const [returnTo, setReturnTo] = useState(null);
  const [phase, setPhase] = useState("talk"); // resume | talk | sending | sent | failed
  const [fresh, setFresh] = useState(null);
  const [freshKey, setFreshKey] = useState(0);
  const [mood, setMood] = useState("wave");
  const [ticketOpen, setTicketOpen] = useState(false);
  const [live, setLive] = useState("");
  const [date, setDate] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [engaged, setEngaged] = useState(mode === "dialog");
  const [more, setMore] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const standRef = useRef(null);
  const sideRef = useRef(null);
  const answerRef = useRef(null);
  const boardRef = useRef(null);
  const heldRef = useRef(0);

  const steps = askedSteps(flow, answers);
  const step = steps.find((s) => s.id === current) || steps[0];
  const ctx = { ...flow.ctx, step };
  const lines = ticketLines(flow, answers);
  const index = steps.indexOf(step);
  const expected = activeSteps(flow, answers).filter((s) => s.line).length;
  // Anty says hello on the first question, until the visitor moves on
  const firstStep = phase === "talk" && index === 0 && trail.length === 0;
  const unsurePicked = !!flow.greeting.unsure && idOf(answers[flow.greeting.unsure.key]) === "unsure";
  const greeting = firstStep && !unsurePicked ? flow.greeting : null;
  const callback = idOf(answers.pace) === "callback";
  const blank = phase === "sent" ? 0 : Math.max(1, Math.min(5, expected - lines.length));
  const first = firstName(answers);
  const who = [answers.name, answers.org].map((x) => (x || "").trim()).filter(Boolean).join(" · ");
  const lineCount = lines.length + (who ? 1 : 0);
  const stage = flow.stages.of[step.id] ?? 0;

  // Dates and drafts only exist in the browser.
  useEffect(() => {
    setDate(today());
    const d = readDraft(flow.key);
    if (d?.answers?.name) {
      const a = { ...d.answers };
      // arriving from a different tier: keep the visitor, drop what the tier decided
      if ((d.start || null) !== (flow.ctx.start || null)) {
        ["track", "shape", "plan", "budget", "features", "editor"].forEach((k) => delete a[k]);
      }
      setAnswers(a);
      setCurrent(d.current || null);
      setPhase("resume");
    }
  }, [flow]);

  // Keep a draft so a closed stand reopens where it was left.
  useEffect(() => {
    if (phase !== "talk" || !answers.name) return;
    writeDraft({ key: flow.key, start: flow.ctx.start, answers, current });
  }, [answers, current, phase, flow]);

  // Anty settles back to idle after waving or writing.
  useEffect(() => {
    if (mood !== "wave" && mood !== "write") return;
    const t = setTimeout(() => setMood("idle"), mood === "wave" ? 2600 : 1100);
    return () => clearTimeout(t);
  }, [mood, freshKey]);

  // On desktop the stand sizes itself to its content and only ever grows, so a
  // short step never leaves a dead half and the frame never jumps back.
  useLayoutEffect(() => {
    const stand = standRef.current;
    if (!stand || window.matchMedia("(max-width: 760px)").matches) return;
    const h = stand.offsetHeight;
    if (h > heldRef.current) {
      heldRef.current = h;
      stand.style.setProperty("--stand-min", `${h}px`);
    }
  });
  useEffect(() => {
    const reset = () => {
      heldRef.current = 0;
      standRef.current?.style.removeProperty("--stand-min");
    };
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  // A long ticket scrolls on the board; say so instead of cutting it off silently.
  const checkMore = useCallback(() => {
    const b = boardRef.current;
    if (!b) return;
    setOverflow(b.scrollHeight > b.clientHeight + 1);
    // "more" means more ticket, not just the padding under it
    const t = b.querySelector(".ticket");
    setMore(!!t && t.getBoundingClientRect().bottom > b.getBoundingClientRect().bottom + 2);
  }, []);
  useLayoutEffect(checkMore);

  // Every new question, and the hand-off, starts at the top of the counter side
  // (on phones the Send button sits below a long ticket, so the sheet is scrolled).
  useEffect(() => {
    if (sideRef.current) sideRef.current.scrollTop = 0;
  }, [current, phase]);

  // Each new question takes focus, so keyboards and screen readers follow along.
  useEffect(() => {
    if (!engaged) return;
    const root = answerRef.current;
    if (!root) return;
    const el = root.querySelector("[data-autofocus]") || root.querySelector("input:not([tabindex='-1']), textarea, button");
    el?.focus({ preventScroll: true });
  }, [current, phase, engaged]);

  // Keep the line being written in view on the board (scrolling only the board).
  useEffect(() => {
    const box = boardRef.current;
    if (!fresh || !box) return;
    const el = box.querySelector(fresh === "for" ? ".tk-for" : `[data-line="${fresh}"]`);
    if (!el) return;
    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.bottom > b.bottom) box.scrollTop += r.bottom - b.bottom + 24;
    else if (r.top < b.top) box.scrollTop -= b.top - r.top + 24;
  }, [fresh, freshKey]);

  // Review reads the ticket from the top; sending scrolls down to the stamp.
  useEffect(() => {
    const box = boardRef.current;
    if (!box) return;
    if (phase === "sent") {
      box.scrollTop = box.scrollHeight;
      // come to rest on a row edge under the pinned band, never mid-row
      const band = box.querySelector(".tk-band");
      const edge = band?.getBoundingClientRect().bottom;
      const row = [...box.querySelectorAll(".tk-for, .tk-line")].find((el) => el.getBoundingClientRect().bottom > edge + 1);
      const gap = row ? edge - row.getBoundingClientRect().top : 0;
      if (gap > 0) box.scrollTop -= gap;
    } else if (step.kind === "review") box.scrollTop = 0;
  }, [phase, step.kind]);

  function goTo(id) {
    setTrail((t) => [...t, step.id]);
    setCurrent(id);
    setEngaged(true);
  }

  function proceed(a) {
    const list = askedSteps(flow, a);
    const i = list.findIndex((s) => s.id === step.id);
    if (returnTo) {
      const r = list.findIndex((s) => s.id === returnTo);
      // an edit can open new questions (a site now exists, say): ask those first
      const gap = list.slice(i + 1, r === -1 ? undefined : r).find((s) => !(s.id in a) && !NOT_ASKED.has(s.kind));
      if (gap) return goTo(gap.id);
      setReturnTo(null);
      if (r !== -1) return goTo(returnTo);
    }
    goTo((list[i + 1] || list[list.length - 1]).id);
  }

  function commit(id, value) {
    const a = { ...answers, [id]: value };
    // a different tier means different budget brackets: ask that again
    if (id === tierKey(flow) && idOf(answers[id]) && idOf(answers[id]) !== idOf(value)) delete a.budget;
    const before = ticketLines(flow, answers);
    const after = ticketLines(flow, a);
    let changed = after.find((l) => {
      const b = before.find((x) => x.id === l.id);
      return !b || b.v !== l.v || b.price !== l.price;
    });
    if (!changed && (id === "name" || id === "org") && value) changed = { id: "for", k: "For", v: value };
    if (changed) {
      setFresh(changed.id);
      setFreshKey((k) => k + 1);
      setMood("write");
      setLive(`Added to your ticket. ${changed.k}: ${changed.v}`);
    }
    setAnswers(a);
    if (id === "pace" && idOf(value) === "callback") return send(a);
    proceed(a);
  }

  // "I'm not sure what I need": rewrite the tier line, stay on the first question
  function markUnsure(key) {
    setAnswers((a) => ({ ...a, [key]: { id: "unsure" } }));
    setFresh("intro");
    setFreshKey((k) => k + 1);
    setMood("write");
    setLive("Added to your ticket. Not sure yet, Nic will suggest one.");
  }

  function back() {
    const list = askedSteps(flow, answers).map((s) => s.id);
    const t = [...trail];
    let prev = t.pop();
    while (prev && !list.includes(prev)) prev = t.pop();
    if (!prev) return;
    setTrail(t);
    setCurrent(prev);
    setReturnTo(null);
    setEngaged(true);
  }

  function edit(lineId) {
    if (phase !== "talk") return;
    let target = lineId;
    if (lineId === "intro") {
      // the tier line reopens the tier question, pre-set to the current pick
      target = tierKey(flow);
      if (!(target in answers)) setAnswers((a) => ({ ...a, [target]: { id: flow.ctx.start || "unsure" } }));
    }
    if (target === step.id) return;
    setReturnTo(step.id);
    setTicketOpen(false);
    goTo(target);
  }

  function resume(keep) {
    if (!keep) {
      dropDraft();
      setAnswers({});
      setCurrent(null);
      setTrail([]);
      setMood("wave");
    }
    setPhase("talk");
    setEngaged(true);
  }

  function payload(a) {
    const asked = askedSteps(flow, a);
    const kept = Object.fromEntries(Object.entries(a).filter(([k, v]) => v != null && asked.some((s) => s.id === k)));
    const r = a.reach || {};
    const via = REACH.find((o) => o.id === r.id);
    return {
      v: 1,
      group: flow.group,
      audience: flow.ctx.audience,
      start: flow.ctx.start,
      summary: ticketSummary(flow, a),
      name: (a.name || "").trim(),
      org: (a.org || "").trim(),
      email: via?.field === "email" ? (r.email || "").trim() : "",
      phone: via?.field === "phone" ? (r.phone || "").trim() : "",
      prefers: via ? via.id : "email",
      callback: idOf(a.pace) === "callback",
      lines: ticketLines(flow, a).map(({ k, v, price }) => (price ? { k, v, price } : { k, v })),
      answers: kept,
      page: typeof window !== "undefined" ? window.location.pathname : "",
      website: honeypot,
    };
  }

  function mailtoHref() {
    const who = [answers.name, answers.org].filter(Boolean).join(" · ");
    const subject = `Project ticket: ${ticketSummary(flow, answers)}${answers.name ? ` from ${answers.name}` : ""}`;
    const body = [`For: ${who}`, ...lines.map((l) => `${l.k}: ${l.v}${l.price ? ` (${l.price})` : ""}`)].join("\n");
    return `mailto:${NIC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function send(a = answers) {
    if (phase === "sending") return;
    setPhase("sending");
    setMood("write");
    setFreshKey((k) => k + 1);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload(a)),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      dropDraft();
      setPhase("sent");
      setMood("happy");
      setLive("Sent. Your ticket is on Nic's board.");
    } catch {
      setPhase("failed");
      setMood("idle");
    }
  }

  /* ---------------- what Anty says ---------------- */

  let say;
  let aside = null;
  if (phase === "resume") {
    say = `Welcome back${first ? `, ${first}` : ""}! Your ticket's right where you left it. Pick up where we left off?`;
  } else if (phase === "sent") {
    say = callback
      ? `Done! Nic will reach out soon${first ? `, ${first}` : ""}.`
      : `Done! Your ticket's on Nic's board${first ? `, ${first}` : ""}.`;
  } else if (phase === "failed") {
    say = "Hmm, the ticket didn't make it to Nic's board. Your answers are safe.";
    aside = "Try again, or send the same ticket as an email.";
  } else if (phase === "sending") {
    say = "Carrying it over to Nic…";
  } else if (greeting) {
    say = `${greeting.say} ${step.say(answers, ctx)}`;
    aside = greeting.aside;
  } else {
    say = step.say(answers, ctx);
    aside = step.aside ? step.aside(answers, ctx) : null;
  }

  const qid = `${titleId}-q`;
  const talking = phase === "talk" || phase === "sending";
  const latest =
    fresh === "for" && who ? { k: "For", v: who } : lines.find((l) => l.id === fresh) || lines[lines.length - 1];
  const showFoot = phase === "talk";
  // review and the hand-off show the ticket in the flow itself (phones)
  const inlineTicket = step.kind === "review" || phase === "sent" || phase === "failed";

  return (
    <div
      ref={standRef}
      className={`stand stand--${mode}${ticketOpen ? " is-ticket-open" : ""}`}
      data-phase={phase}
      data-kind={step.kind}
    >
      <h2 id={titleId} className="sr-only">
        Project ticket for Nic
      </h2>

      <section className="st-side" aria-label={`${ANT_NAME}'s questions`} ref={sideRef}>
        <div className="st-talk">
          <Anty mood={step.kind === "review" && phase === "talk" && mood === "idle" ? "point" : mood} className="st-anty" />
          <div className="st-balloon" key={`${phase}-${step.id}`}>
            <p className="st-say" id={qid}>
              <Say text={say} />
            </p>
            {aside && (
              <p className="st-aside">
                <Say text={aside} />
              </p>
            )}
          </div>
        </div>

        <div className="st-counter" aria-hidden="true">
          <span>{ANT_NAME} · Writing it up for Nic</span>
        </div>

        <div className="st-answer" ref={answerRef}>
          {phase === "resume" && (
            <div className="st-actions">
              <button type="button" className="btn btn-primary" data-autofocus onClick={() => resume(true)}>
                Pick up where I left off <Icon name="next" />
              </button>
              <button type="button" className="st-link" onClick={() => resume(false)}>
                Start a fresh ticket
              </button>
            </div>
          )}

          {talking && (
            <StepAnswer
              key={step.id}
              step={step}
              answers={answers}
              ctx={ctx}
              qid={qid}
              sending={phase === "sending"}
              next={flow.next(answers)}
              onCommit={(v) => commit(step.id, v)}
              onSend={() => send()}
              honeypot={honeypot}
              setHoneypot={setHoneypot}
            />
          )}

          {firstStep && (
            <div className="st-hello">
              {flow.greeting.unsure && !unsurePicked && (
                <button type="button" className="st-link" onClick={() => markUnsure(flow.greeting.unsure.key)}>
                  {flow.greeting.unsure.label}
                </button>
              )}
              <p className="st-alt">
                Rather email? <a href={`mailto:${NIC_EMAIL}`}>{NIC_EMAIL}</a>
              </p>
            </div>
          )}

          {phase === "failed" && (
            <div className="st-actions">
              <button type="button" className="btn btn-primary" data-autofocus onClick={() => send()}>
                Try again <Icon name="next" />
              </button>
              <a className="st-link" href={mailtoHref()}>
                Email it instead
              </a>
            </div>
          )}

          {phase === "sent" && (
            <NicNote
              first={first}
              reach={answers.reach}
              callback={callback}
              group={flow.group}
              mode={mode}
              onClose={onClose}
            />
          )}

          {inlineTicket && (
            <Ticket
              className="ticket--inline"
              date={date}
              name={(answers.name || "").trim()}
              org={(answers.org || "").trim()}
              lines={lines}
              footer={FOOTERS[flow.group]}
              onEdit={phase === "talk" ? edit : undefined}
              stamp={phase === "sent" ? { date } : null}
            />
          )}
        </div>

        {showFoot && (
          <div className="st-foot">
            {trail.length ? (
              <button type="button" className="st-link st-back" onClick={back}>
                <Icon name="back" /> Back
              </button>
            ) : (
              <span className="st-back" aria-hidden="true" />
            )}
            <p className="st-progress">
              <span className="sr-only">
                Part {stage + 1} of {flow.stages.labels.length}: {flow.stages.labels[stage]}
              </span>
              <span className="st-stages" aria-hidden="true">
                {flow.stages.labels.map((label, i) => (
                  <i key={label} className={i < stage ? "done" : i === stage ? "now" : undefined} />
                ))}
              </span>
              <span className="st-stage-label" aria-hidden="true">
                {flow.stages.labels[stage]}
              </span>
            </p>
            {step.optional ? (
              <button type="button" className="st-link st-skip" onClick={() => commit(step.id, null)}>
                {step.skipLabel || "Skip"}
              </button>
            ) : (
              <span className="st-skip" aria-hidden="true" />
            )}
          </div>
        )}
      </section>

      <section className="st-board" aria-label="Your ticket">
        {inlineTicket ? (
          <p className="tk-peek tk-peek--status">
            <span className="tk-peek-title">
              {phase === "sent" ? "Sent to Nic" : phase === "failed" ? "Not sent yet" : "Ready to send"}
            </span>
            <span className="tk-peek-last">
              {lineCount} {lineCount === 1 ? "line" : "lines"} on your ticket
            </span>
          </p>
        ) : (
          <button
            type="button"
            className="tk-peek"
            aria-expanded={ticketOpen}
            aria-controls={`${titleId}-ticket`}
            onClick={() => setTicketOpen((o) => !o)}
          >
            <span className="tk-peek-title">
              Your ticket · {lineCount} {lineCount === 1 ? "line" : "lines"}
            </span>
            <span className="tk-peek-last" key={ticketOpen ? "open" : freshKey}>
              {ticketOpen ? `Back to ${ANT_NAME}` : latest ? `${latest.k}: ${latest.v}` : "Nothing on it yet"}
            </span>
            <Icon name="chevron" className="tk-peek-chev" />
          </button>
        )}
        <div className="st-board-scroll" ref={boardRef} onScroll={checkMore}>
          <Ticket
            id={`${titleId}-ticket`}
            clip
            date={date}
            name={(answers.name || "").trim()}
            org={(answers.org || "").trim()}
            lines={lines}
            blank={blank}
            fresh={fresh}
            freshKey={freshKey}
            onEdit={phase === "talk" ? edit : undefined}
            footer={FOOTERS[flow.group]}
            stamp={phase === "sent" ? { date } : null}
          />
        </div>
        {overflow && (
          // its own strip under the ticket, so the cue never covers a line
          <div className="st-board-foot">
            <button
              type="button"
              className={`st-more${more ? "" : " is-up"}`}
              onClick={() => {
                const b = boardRef.current;
                if (!b) return;
                if (more) b.scrollBy({ top: b.clientHeight * 0.7, behavior: "smooth" });
                else b.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {more ? "More of your ticket" : "Back to the top"} <Icon name="chevron" />
            </button>
          </div>
        )}
      </section>

      {mode === "dialog" && (
        <button type="button" className="st-close" onClick={onClose} aria-label="Close the ticket stand">
          <Icon name="close" />
        </button>
      )}

      <p className="sr-only" aria-live="polite">
        {live}
      </p>
    </div>
  );
}

/* ---------------- answers ---------------- */

function StepAnswer({ step, answers, ctx, qid, sending, next, onCommit, onSend, honeypot, setHoneypot }) {
  const value = answers[step.id];
  switch (step.kind) {
    case "single":
      return <SingleAnswer step={step} value={value} answers={answers} ctx={ctx} qid={qid} onCommit={onCommit} />;
    case "multi":
      return <MultiAnswer step={step} value={value} answers={answers} ctx={ctx} qid={qid} onCommit={onCommit} />;
    case "text":
    case "long":
      return <TextAnswer step={step} value={value} qid={qid} onCommit={onCommit} />;
    case "reach":
      return <ReachAnswer value={value} qid={qid} onCommit={onCommit} honeypot={honeypot} setHoneypot={setHoneypot} />;
    case "review":
      return (
        <div className="st-review">
          <div className="st-actions">
            <button type="button" className="btn btn-primary" data-autofocus onClick={onSend} disabled={sending}>
              {sending ? "Sending…" : "Send it to Nic"} {!sending && <Icon name="next" />}
            </button>
          </div>
          <ol className="st-next" aria-label="What happens next">
            {next.map((t, i) => (
              <li key={t}>
                <span className="st-next-n" aria-hidden="true">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      );
    default:
      return null;
  }
}

function Chip({ option, pressed, onClick, check }) {
  return (
    <button
      type="button"
      className={`chip${option.sub ? " chip--sub" : ""}`}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {check && <Icon name="check" className="chip-check" />}
      <span className="chip-label">{option.label}</span>
      {option.sub && <span className="chip-sub">{option.sub}</span>}
    </button>
  );
}

function SingleAnswer({ step, value, answers, ctx, qid, onCommit }) {
  const opts = optionsOf(step, answers, ctx);
  const startOther = value && opts.find((o) => o.id === value.id)?.other ? value.id : null;
  const [other, setOther] = useState(startOther);
  const [text, setText] = useState(value?.text || "");
  const otherOpt = opts.find((o) => o.id === other);

  return (
    <>
      <div className={`chips${opts.some((o) => o.sub) ? " chips--cards" : ""}`} role="group" aria-labelledby={qid}>
        {opts.map((o) => (
          <Chip
            key={o.id}
            option={o}
            pressed={other ? other === o.id : value?.id === o.id}
            onClick={() => (o.other ? setOther(other === o.id ? null : o.id) : onCommit({ id: o.id }))}
          />
        ))}
      </div>
      {otherOpt && (
        <OtherText
          placeholder={otherOpt.placeholder}
          value={text}
          onChange={setText}
          onSubmit={() => (text.trim() ? onCommit({ id: otherOpt.id, text: text.trim() }) : null)}
        />
      )}
    </>
  );
}

function MultiAnswer({ step, value, answers, ctx, qid, onCommit }) {
  const opts = optionsOf(step, answers, ctx);
  const [ids, setIds] = useState(value?.ids || []);
  const [text, setText] = useState(value?.text || "");
  const [error, setError] = useState("");
  const otherOpt = opts.find((o) => o.other);
  const otherOn = otherOpt && ids.includes(otherOpt.id);

  function toggle(o) {
    setError("");
    setIds((cur) => {
      if (cur.includes(o.id)) return cur.filter((x) => x !== o.id);
      if (o.only) return [o.id];
      const only = opts.filter((x) => x.only).map((x) => x.id);
      return [...cur.filter((x) => !only.includes(x)), o.id];
    });
  }

  function submit(e) {
    e?.preventDefault();
    const chosen = ids.filter((id) => opts.some((o) => o.id === id));
    if (!chosen.length) {
      if (step.optional) return onCommit(null);
      setError("Pick at least one. Rough is fine.");
      return;
    }
    onCommit({ ids: chosen, text: otherOn ? text.trim() : "" });
  }

  return (
    <form className="st-multi" onSubmit={submit} noValidate>
      <div className="chips" role="group" aria-labelledby={qid}>
        {opts.map((o) => (
          <Chip key={o.id} option={o} pressed={ids.includes(o.id)} onClick={() => toggle(o)} check />
        ))}
      </div>
      {otherOn && (
        <input
          className="st-text"
          aria-label={otherOpt.placeholder}
          placeholder={otherOpt.placeholder}
          value={text}
          maxLength={200}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <div className="st-actions">
        <button type="submit" className="btn btn-primary">
          Next <Icon name="next" />
        </button>
        {error && (
          <p className="st-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

function OtherText({ placeholder, value, onChange, onSubmit }) {
  return (
    <form
      className="st-input"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="st-text"
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        maxLength={200}
        autoFocus
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Next <Icon name="next" />
      </button>
    </form>
  );
}

function TextAnswer({ step, value, qid, onCommit }) {
  const [v, setV] = useState(value || "");
  const [error, setError] = useState("");
  const long = step.kind === "long";

  function submit(e) {
    e?.preventDefault();
    const t = v.trim();
    if (!t && !step.optional) {
      setError(step.id === "name" ? "Just a first name is fine." : "Add a few words, or skip this one.");
      return;
    }
    onCommit(t || null);
  }

  const shared = {
    className: "st-text",
    "aria-labelledby": qid,
    placeholder: step.placeholder,
    value: v,
    maxLength: step.max || 200,
    autoComplete: step.autoComplete || "off",
    inputMode: step.inputMode,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${qid}-err` : undefined,
    onChange: (e) => {
      setV(e.target.value);
      setError("");
    },
  };

  return (
    <form className={`st-input${long ? " st-input--long" : ""}`} onSubmit={submit} noValidate>
      {long ? (
        <textarea
          {...shared}
          rows={4}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(e);
          }}
        />
      ) : (
        <input {...shared} type="text" enterKeyHint="next" />
      )}
      <button type="submit" className="btn btn-primary">
        Next <Icon name="next" />
      </button>
      {error && (
        <p className="st-error" id={`${qid}-err`} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

/** "What's the best way to contact you?": pick a way, then the matching field appears. */
function ReachAnswer({ value, qid, onCommit, honeypot, setHoneypot }) {
  const [via, setVia] = useState(value?.id || null);
  const [email, setEmail] = useState(value?.email || "");
  const [phone, setPhone] = useState(value?.phone || "");
  const [error, setError] = useState("");
  const how = REACH.find((o) => o.id === via);
  const isEmail = how?.field === "email";

  function submit(e) {
    e.preventDefault();
    if (isEmail) {
      if (!EMAIL_RE.test(email.trim())) return setError("That email looks a little off. Mind checking it?");
      return onCommit({ id: via, email: email.trim() });
    }
    if (phone.replace(/\D/g, "").length < 7) return setError("That number looks a little short. Mind checking it?");
    onCommit({ id: via, phone: phone.trim() });
  }

  return (
    <form className="st-reach" onSubmit={submit} noValidate>
      <div className="chips" role="group" aria-labelledby={qid}>
        {REACH.map((o) => (
          <Chip
            key={o.id}
            option={o}
            pressed={via === o.id}
            onClick={() => {
              setVia(o.id);
              setError("");
            }}
          />
        ))}
      </div>
      {how && (
        <div className="st-input" key={how.field}>
          <input
            className="st-text"
            type={isEmail ? "email" : "tel"}
            inputMode={isEmail ? "email" : "tel"}
            autoComplete={isEmail ? "email" : "tel"}
            aria-label={isEmail ? "Your email address" : "Your phone number"}
            placeholder={isEmail ? "you@example.com" : "Your phone number"}
            maxLength={isEmail ? 200 : 40}
            value={isEmail ? email : phone}
            autoFocus
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${qid}-err` : undefined}
            onChange={(e) => {
              (isEmail ? setEmail : setPhone)(e.target.value);
              setError("");
            }}
          />
          <button type="submit" className="btn btn-primary">
            Next <Icon name="next" />
          </button>
          {error && (
            <p className="st-error" id={`${qid}-err`} role="alert">
              {error}
            </p>
          )}
        </div>
      )}
      {/* left empty by people; filled by bots */}
      <input
        className="st-hp"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
    </form>
  );
}

/* ---------------- the hand-off ---------------- */

function NicNote({ first, reach, callback, group, mode, onClose }) {
  const what =
    group === "partner"
      ? "how I'd work with you and my rates"
      : group === "plan"
      ? "a recommendation and a flat monthly price"
      : "a plan and a flat price";
  const where = reach?.id === "email" ? reach.email : reach?.phone;
  const how = { email: "email you at", call: "call you at", text: "text you at" }[reach?.id] || "get back to you at";
  return (
    <div className="st-nic">
      <img className="st-nic-photo" src="/nic.jpg" alt="Nic Ford" width="800" height="800" />
      <div className="st-nic-note">
        <p className="st-nic-h">Thanks{first ? `, ${first}` : ""}. I&apos;ve got it from here.</p>
        <p>
          {callback ? "I'll " : "I read every ticket myself, and I'll "}
          {how} <strong>{where}</strong>{" "}
          {callback ? "to hear about your project" : `with ${what}`}, usually within a day.
        </p>
        <p className="st-nic-sign">— Nic</p>
        <div className="st-actions">
          {mode === "dialog" ? (
            <button type="button" className="btn" data-autofocus onClick={onClose}>
              Back to the page
            </button>
          ) : (
            <Link className="btn" href="/" data-autofocus>
              Back to the homepage
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
