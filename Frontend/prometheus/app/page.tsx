"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type HomePageContent = {
  name: string;
  topicHeading?: { value: string | null };
  description?: { value: string | null };
  mainBody?: { value: string | null };
};

// Convert CMS HTML into readable text while retaining line breaks.
function toPlainText(html: string | null | undefined) {
  if (!html) return "";

  const document = new DOMParser().parseFromString(html, "text/html");

  document.querySelectorAll("br").forEach((element) => {
    element.replaceWith(document.createTextNode("\n"));
  });

  document.querySelectorAll("p").forEach((element) => {
    element.appendChild(document.createTextNode("\n\n"));
  });

  return document.body.textContent?.trim() || "";
}

export default function Home() {
  const [page, setPage] = useState<HomePageContent | null>(null);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadHomePage() {
      try {
        const response = await fetch(
          "https://due-commonly-parts-chi.trycloudflare.com/api/episerver/v3.0/content/5?language=en",
          {
            headers: {
              "Accept-Language": "en",
            },
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Unable to load home page: ${response.status}`);
        }

        const data: HomePageContent = await response.json();

        setPage(data);
        setBody(toPlainText(data.mainBody?.value));
      } catch (error) {
        if (controller.signal.aborted) return;

        setError(
          error instanceof Error ? error.message : "Unable to load home page."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadHomePage();

    return () => controller.abort();
  }, []);

  return (
    <main
      style={{
        maxWidth: 960,
        margin: "40px auto",
        padding: "0 24px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.7,
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #ccc",
          paddingBottom: 16,
          marginBottom: 32,
        }}
      >
        <strong>Project Prometheus</strong>
      </header>

      {loading && <p role="status">Loading home page...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && page && (
        <>
          <section>
            <h1>{page.topicHeading?.value || page.name}</h1>
            <p>{page.description?.value}</p>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2>About this learning portal</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{body}</p>
          </section>

          <section style={{ marginTop: 40 }}>
            <h2>Start learning</h2>
            <Link href="/overview">Optimizely CMS Overview →</Link>
          </section>
        </>
      )}
    </main>
  );
}