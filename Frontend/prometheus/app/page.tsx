"use client";

import { useEffect, useState } from "react";

type Lesson = {
  name: string;
  lessonNumber?: { value: number | null };
  learningObjectives?: { value: string | null };
  estimatedMinutes?: { value: number | null };
  lessonContent?: { value: string | null };
};

// Display CMS HTML as plain text for this first version.
function toPlainText(html: string | null | undefined) {
  if (!html) return "";

  const document = new DOMParser().parseFromString(html, "text/html");
  return document.body.textContent?.trim() || "";
}

export default function Home() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [objectives, setObjectives] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLesson() {
      try {
        const response = await fetch(
          "https://complex-model-picks-vampire.trycloudflare.com/api/episerver/v3.0/content/8?language=en",
          {
            headers: {
              "Accept-Language": "en",
            },
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Unable to load lesson: ${response.status}`);
        }

        const data: Lesson = await response.json();

        setLesson(data);
        setObjectives(toPlainText(data.learningObjectives?.value));
        setContent(toPlainText(data.lessonContent?.value));
      } catch (error) {
        if (controller.signal.aborted) return;

        setError(
          error instanceof Error ? error.message : "Unable to load lesson."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLesson();

    return () => controller.abort();
  }, []);

  return (
    <main
      style={{
        maxWidth: 900,
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
        <p>Learn Optimizely CMS</p>
      </header>

      {loading && <p role="status">Loading lesson...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && lesson && (
        <article>
          {lesson.lessonNumber?.value != null && (
            <p>Lesson {lesson.lessonNumber.value}</p>
          )}

          <h1>{lesson.name}</h1>

          {lesson.estimatedMinutes?.value != null &&
            lesson.estimatedMinutes.value > 0 && (
              <p>
                Estimated reading time: {lesson.estimatedMinutes.value} minutes
              </p>
            )}

          <section style={{ marginTop: 32 }}>
            <h2>Learning objectives</h2>
            <p>{objectives || "Learning objectives will be added soon."}</p>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2>Lesson content</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {content || "Lesson content will be added soon."}
            </p>
          </section>
        </article>
      )}
    </main>
  );
}