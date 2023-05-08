import { globalStyle, style } from "@vanilla-extract/css";

export const configEditor = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: "1rem",
  paddingBottom: "5rem",
});

export const primitivesModule = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  width: "40rem",
  "@media": {
    "screen and (max-width: 830px)": {
      width: "100%",
    },

    "screen and (max-width: 500px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

globalStyle(`${primitivesModule} > input`, {
  color: "white",
  borderStyle: "solid",
  borderColor: "#00f",
  backgroundColor: "black",
});

export const objectsModule = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "none",
  marginTop: "0.5rem",
});

export const objectClosed = style({
  visibility: "hidden",
  height: "0",
  overflow: "hidden",
});

export const objectOpen = style({
  display: "flex",
  flexDirection: "column",
  visibility: "visible",
  height: "auto",
  overflow: "visible",
  padding: "0.5rem 0.5rem 0.5rem 1.5rem",
  borderStyle: "none solid solid solid",
  borderColor: "#fff",
});

export const configButtons = style({
  zIndex: 1,

  position: "fixed",
  bottom: "0",
  left: "0",
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
  padding: "1rem",
});

globalStyle(`${configButtons} > button`, {
  borderStyle: "solid",
  borderColor: "#00f",
});
