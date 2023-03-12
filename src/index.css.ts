import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
  padding: 0,
  margin: 0,
  fontFamily: "Roboto, sans-serif",
});

globalStyle("#root", {
  height: "100vh",
  backgroundColor: "black",
  overflow: "hidden",
});
