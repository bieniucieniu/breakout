import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  boxShadow: "4px 4px 0 #000000",

  backgroundColor: "#ffffff",
  height: "100%",
  width: "100%",
});

export const button = style([
  container,
  {
    color: "black",
    border: "none",
    zIndex: 1,
    transition:
      "transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out",

    ":hover": {
      transform: "translate(-1px, -1px)",
      boxShadow: "6px 6px 0 #000000",
    },
    ":active": {
      transform: "translate(2px, 2px)",
      boxShadow: "3px 3px 0 #000000",
    },
    ":disabled": {
      backgroundColor: "#888888",
      transform: "translate(1px, 1px)",
      boxShadow: "3px 3px 0 #000000",
    },
  },
]);
// globalStyle(`${button}:not(disabled):hover`, {
//   transform: "translate(-1px, -1px)",
// });

export const linkButton = style([
  button,
  {
    cursor: "pointer",
  },
]);

export const display = style([
  container,
  {
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);

export const title = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
});
