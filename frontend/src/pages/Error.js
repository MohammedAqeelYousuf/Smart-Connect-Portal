
import React from "react";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        color: "red",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "80px", margin: "0" }}>404</h1>
      <h2 style={{ margin: "10px 0" }}>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
