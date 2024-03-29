import { style } from "@vanilla-extract/css";

export const center = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const title = style({
  fontSize: "2rem",
  lineHeight: "3.5rem",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: "auto",
  color: "white",
  "@media": {
    "screen and (max-width: 450px)": {
      fontSize: "1.5rem",
      lineHeight: "2.5rem",
    },
  },
});

export const subTitle = style({
  fontSize: "1.5rem",
  lineHeight: "2.5rem",
  textAlign: "center",
  padding: "auto",
  color: "white",
  "@media": {
    "screen and (max-width: 450px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
  },
});

export const centeredTitle = style([title, center]);

export const spaceItemsVer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});
