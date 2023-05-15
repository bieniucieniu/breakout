import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
  fontFamily: "'Roboto Mono', monospace",
  color: "white",
  fontSize: "1.1rem",
});

globalStyle("html, body", {
  padding: "0",
  margin: "0",
  height: "100vh",
  backgroundColor: "black",
});
