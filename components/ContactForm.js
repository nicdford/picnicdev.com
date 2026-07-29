"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const tiers = ["Not sure yet", "Static", "WordPress", "Custom", "Agency partner"];

export default function ContactForm() {
  const params = useSearchParams();
  const [project, setProject] = useState("Not sure yet");

  // Pre-select the tier if the visitor arrived from a pricing button.
  useEffect(() => {
    const t = params.get("tier");
    if (t && tiers.includes(t)) setProject(t);
  }, [params]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const projectType = data.get("project") || "";
    const message = data.get("message") || "";

    const subject = `New project inquiry — ${projectType}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Interested in: ${projectType}\n\n` +
      `${message}\n`;

    window.location.href = `mailto:hello@picnicdev.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" required placeholder="Jane Baker" />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@bakery.com"
        />
      </div>

      <div className="field">
        <label htmlFor="project">What are you after?</label>
        <select
          id="project"
          name="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          {tiers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Tell me about your project</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="A little about your business, what you need, timeline, and any links or designs…"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Send it over →
      </button>
    </form>
  );
}
