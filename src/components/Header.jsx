import React from "react";
import ThemeToggle from "./ThemeToggle";

function Header({ theme, onThemeToggle }) {
  return (
    <header>
      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      <h1>
        <span style={{ marginRight: "10px" }}>📝</span>
        Keeper App
      </h1>
    </header>
  );
}

export default Header;