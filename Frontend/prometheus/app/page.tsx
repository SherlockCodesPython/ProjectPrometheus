"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {
    fetch(
      "https://complex-model-picks-vampire.trycloudflare.com/api/episerver/v3.0/content/8?language=en",
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => setTitle(data.name))
      .catch((error) => setTitle(error.message));
  }, []);

  return <h1>{title}</h1>;
}