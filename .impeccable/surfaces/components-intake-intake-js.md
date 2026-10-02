---
version: 1
slug: "components-intake-intake-js"
primary_target: "components/intake/Intake.js"
related_targets: ["app/contact/page.js","components/intake/IntakeDialog.js"]
---

# Intake — Anty's ticket stand

**Scope:** the project intake. A modal over any audience home, opened by every start/contact CTA (tier cards, care plans, partner shapes, CTA band, nav and footer Contact), plus the same stand rendered inline at `/contact` for direct links. Replaces the old contact form. **Mode:** Persuade (the visitor decides to engage and hands over their project).

**Audience / job:** a warm lead who just clicked a price. Small-business owner first (often non-technical, cost-wary), with agency and organization branches. Job: tell Nic enough for a plan and a flat price, in about two minutes, without it feeling like a form or a chatbot.

**Constraints:** Anty is Nic's helper, never Nic and never an AI. Every reply comes from Nic personally; the stand says so. Only real, published prices appear on the ticket (the tier's starting price). Nothing on the stand may imply volume (no ticket numbers), urgency, or proof. Submissions go to `/api/intake` (stored + emailed to Nic); mailto is the fallback so a lead is never lost. Drafts resume locally.

## Direction contract

THESIS. Starting a project means walking up to a picnic stand where Anty, Nic's helper ant, writes your project on a ticket for Nic, one line per answer. It refuses both the contact form and the chatbot transcript: the ticket is the conversation's only record, and it is exactly what Nic reads.

OWN-WORLD. The poster world staged as a stand. On the cream counter side: Anty (red ant, ink outlines, yellow pencil) and his comic balloon. On a blue board: a white ticket with a red-deep "Ticket for Nic" band, dot-leader lines, the tier's real starting price, and a "not an order" footer. 2px chips, one 3px stamp button, and a red SENT TO NIC rubber stamp at the end.

STORY. The visitor clicks a tier CTA and meets Anty. Anty asks their name, then the best way to contact them (email, call or text, with the matching field), then whether they have time for a few quick questions or would rather Nic just reach out. "Just reach out" sends the short ticket on the spot. "Ask away" continues with about a dozen quick, mostly-tap questions while the ticket fills; any line can be tapped to fix, then they send. Nic's face and his promise to reply in the way they asked close the flow. Nothing is bought.

FIRST VIEWPORT. A desktop modal about 1080px wide over a cream wash. It sizes itself to its content (about 490px tall on the first question), grows as the ticket fills, never shrinks back, and stops at the viewport. The left ~54% is the stand: Anty at about 166px behind a yellow counter signed "Anty · writing it up for Nic", with a balloon beside him whose greeting names the tier in red italic and asks the first question right there ("Hey! I'm Anty, Nic's helper. What's your name?", with the tier named in the small print: "A WordPress build? Lovely."). The answer field and Next sit under the counter, with "I'm not sure what I need" and "Rather email?" beneath. The right ~46% is the blue board with the ticket clipped to it, its first line already printed: "Build · WordPress … from $1,500". On phones it becomes a full-screen sheet, and the ticket is a blue peek bar under the header reading "Your ticket · N lines" plus the latest line.

SIGNATURE INTERACTION. Each answer writes a new line onto the ticket (a pencil wipe, then a yellow highlight that fades) while Anty's pencil arm scribbles. Sending stamps the ticket in its own corner of the tear-off strip. On a long ticket the red band stays pinned and a "More of your ticket" cue shows. Motion grammar: the site's lift-off-the-paper ease for the modal, the wipe, the scribble, and the stamp. Anty also has two story beats, a wave on hello and a hop once the ticket is sent. Nothing else moves: no idle loops, no per-step pops. Reduced motion makes all of it instant.

FORM. Order Pad, #6 of 7 on the ranked structure list; surface seed ede56a3a.

FINISH. unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Real reply address (the site's `hello@picnicdev.com` is a placeholder) and Resend sender domain.
- Production database: Turso URL + token, or a file on a fly.io volume.
- Inbox password for `/inbox`.
