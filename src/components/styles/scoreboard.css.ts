import { globalKeyframes, globalStyle, style } from "@vanilla-extract/css";
import { navbar } from "./navbar.css";

export const scoreboardNav = style([
  navbar,
  {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit , minmax(100px, 1fr))",

    "@media": {
      "screen and (max-width: 600px)": {
        gridTemplateColumns: "repeat(auto-fit , minmax(50px, 1fr))",
      },
    },
  },
]);

globalStyle(`${scoreboardNav} > *`, {});

export const scoreboard = style({
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "blue",
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
  gridTemplateColumns: "2rem repeat(4, 1fr)",
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
    width: "100%",
    position: "sticky",
    top: "0",
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
