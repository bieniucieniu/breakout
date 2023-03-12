import { style } from "@vanilla-extract/css";

export const container = style({
  borderStyle: "inset",
  borderColor: "white",
  backgroundColor: "white",
  borderWidth: "4px",
  height: "100%",
  width: "100%",
});

export const button = style([
  container,
  {
    zIndex: 1,
    ":hover": {
      transform: "scale(101%)",
    },
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
