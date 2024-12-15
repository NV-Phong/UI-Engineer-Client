import { SandpackTheme } from "@codesandbox/sandpack-react";

export const vscodeTheme: SandpackTheme = {
  colors: {
    surface1: "#1e1e1e",
    surface2: "#252526",
    surface3: "#3c3c3c",
    clickable: "#cccccc",
    base: "#d4d4d4",
    disabled: "#6b6b6b",
    hover: "#2a2d2e",
    accent: "#007acc",
    error: "#f48771",
    errorSurface: "#f48771",
  },
  syntax: {
    plain: "#d4d4d4",
    comment: { color: "#6A9955", fontStyle: "italic" },
    keyword: "#569cd6",
    tag: "#569cd6",
    punctuation: "#d4d4d4",
    definition: "#4ec9b0",
    property: "#9cdcfe",
    static: "#d4d4d4",
    string: "#ce9178",
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: '"Consolas", "Menlo", "Monaco", "Courier New", monospace',
    size: "13px",
    lineHeight: "20px",
  },
};

