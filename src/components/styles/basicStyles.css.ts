import { style } from "@vanilla-extract/css";

export const center = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const title = style({
  fontSize: "2rem",
  lineHeight: "3.5rem",
  textAlign: "center",
  padding: "auto",
  color: "white",
});

export const centeredTitle = style([title, center]);
