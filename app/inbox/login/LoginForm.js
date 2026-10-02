"use client";

import { useActionState } from "react";
import { signIn } from "../actions";
import Icon from "@/components/Icon";

export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="ib-login">
      <label className="st-field">
        <span>Password</span>
        <input
          className="st-text"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          aria-invalid={state?.error ? true : undefined}
          aria-describedby={state?.error ? "login-err" : undefined}
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Opening…" : "Open the inbox"} {!pending && <Icon name="next" />}
      </button>
      {state?.error && (
        <p className="st-error" id="login-err" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
