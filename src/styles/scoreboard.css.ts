import { globalStyle, style } from "@vanilla-extract/css";
import { navbar } from "./navbar.css";

export const scoreboardNav = style([
  navbar,
  {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit , minmax(100px, 1fr))",

    "@media": {
      "screen and (max-width: 600px)": {
        gridTemplateColumns: "1fr 1fr",
      },
    },
  },
]);

export const scoreboard = style({
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "blue",

  padding: "1.5rem 1.5rem 1.5rem 2.5rem",
  overflow: "auto",
  scrollbarGutter: "stable",

  "::-webkit-scrollbar": {
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "1rem",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#00f",
  },
});

globalStyle(`${scoreboard} > h1`, {
  color: "white",
  fontSize: "2rem",
  fontWeight: "700",
});

globalStyle(`${scoreboard} > p`, {
  color: "white",
  height: "1rem",
  lineHeight: "1rem",
  fontSize: "0.8rem",
  padding: "0.5rem 0",
  margin: "0",
});

export const tableContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  borderRadius: "5px",
  boxShadow: "3px 3px 0 #000000",
});

export const table = style({
  display: "flex",
  flexDirection: "column",
  padding: "0",
  margin: "0",
  width: "100%",
});

export const row = style({
  display: "Grid",
  gridTemplateColumns: "2rem repeat(4, minmax(4rem, 1fr))",
});

export const cell = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: ".5rem 1rem",
  border: "1px solid black",
});

export const tableHeader = style([
  row,
  {
    transform: "translate(-2px, 2px)",
    boxShadow: "3px 3px 0 #000000",
  },
]);

globalStyle(`${tableHeader} > *:nth-child(1)`, {
  backgroundColor: "black",
  color: "white",
  fontWeight: "700",
});

globalStyle(`${tableHeader} > *`, {
  color: "black",
  backgroundColor: "white",
  fontWeight: "600",
});
