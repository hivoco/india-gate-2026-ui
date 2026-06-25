"use client";

// last resort boundary. only fires when the root layout itself throws, so it
// replaces the whole shell and must render its own html and body. the layout
// fonts and globals are not present here, so styling stays inline and minimal.
// production only, in dev the error overlay shows instead.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#672e1f",
          backgroundColor: "#fbefcb",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.5rem", margin: 0 }}>
            something went wrong
          </h1>
          <p style={{ marginTop: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
            the site ran into an unexpected error. please try again.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              backgroundColor: "#672e1f",
              color: "#fff",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            try again
          </button>
        </div>
      </body>
    </html>
  );
}
