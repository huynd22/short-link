"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi không xác định");
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card">
      <h1>Rút gọn link</h1>
      <p className="sub">Dán link vào, nhận link ngắn chuyển hướng 302.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Tạo"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {shortUrl && (
        <div className="result">
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
          <button className="copy" onClick={copy}>
            {copied ? "Đã copy" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
