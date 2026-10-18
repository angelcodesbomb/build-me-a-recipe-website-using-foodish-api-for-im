import React from "react";

export default function RecipeCard({ name, description, imageUrl, loading, onRefresh }) {
  const cardStyle = {
    backgroundColor: "#fffbf0",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const imgContainerStyle = {
    width: "100%",
    height: "180px",
    backgroundColor: "#f0e6d2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const contentStyle = {
    padding: "0.75rem",
    flexGrow: 1,
  };

  const titleStyle = {
    margin: "0 0 0.5rem 0",
    fontSize: "1.25rem",
    color: "#c0392b",
  };

  const descStyle = {
    margin: 0,
    fontSize: "0.9rem",
    color: "#555",
  };

  const buttonStyle = {
    margin: "0.75rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#e67e22",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "flex-start",
  };

  return (
    <article style={cardStyle} aria-label={`Recipe card for ${name}`}>
      <div style={imgContainerStyle}>
        {loading ? (
          <span>Loading…</span>
        ) : (
          <img
            src={imageUrl}
            alt={`${name} dish`}
            style={imgStyle}
            loading="lazy"
          />
        )}
      </div>
      <section style={contentStyle}>
        <h2 style={titleStyle}>{name}</h2>
        <p style={descStyle}>{description}</p>
        <button
          style={buttonStyle}
          onClick={onRefresh}
          aria-label={`Refresh image for ${name}`}
        >
          🔄 Freshen Up
        </button>
      </section>
    </article>
  );
}
