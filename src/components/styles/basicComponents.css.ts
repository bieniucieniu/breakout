import { style } from "@vanilla-extract/css";

export const container = style({
  boxShadow: "4px 4px 0 #000000",

  backgroundColor: "#ffffff",
  height: "100%",
  width: "100%",
});

export const button = style([
  container,
  {
    border: "none",
    zIndex: 1,
    ":hover": {
      transform: "scale(101%)",
    },
  },
]);

export const linkButton = style([
  button,
  {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
]);

export const valueDisplay = style([
  container,
  {
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
