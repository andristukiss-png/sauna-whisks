"use client";

import { useState } from "react";

export function ArticleTools() {
  const [message, setMessage] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("Link copied.");
    } catch {
      setMessage("Copy failed. Use the browser address bar.");
    }
  }

  return (
    <div className="article-tools">
      <button type="button" onClick={copyLink}>Copy link</button>
      <button type="button" onClick={() => window.print()}>Print guide</button>
      <span role="status" aria-live="polite" aria-atomic="true">{message}</span>
    </div>
  );
}
