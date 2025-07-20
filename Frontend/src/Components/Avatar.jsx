import React from "react";

function Avatar({ name, size = 50 }) {
  const bgColor = getBackgroundColor(name || "Unknown");

  const styles = {
    width: size,
    height: size,
    backgroundColor: bgColor,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontSize: size / 2.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    boxShadow: '0 2px 12px 0 rgba(201,161,74,0.09)',
    border: `2.5px solid #c9a14a`,
  };

  return <div style={styles} className="temple-shadow temple-border">{getInitials(name || "Unknown")}</div>;
}

function getBackgroundColor(name) {
  if (!name || name.length === 0) {
    return "#cccccc"; // Default background color
  }

  const colors = ["#d64e44", "#0082f6", "#1d1d35", "#8762b7", "#f39c12"];
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name) {
  if (!name) return "";
  const words = name.split(" ");
  return words.length === 1
    ? words[0][0].toUpperCase()
    : (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export default Avatar;

