import { createContainer, style } from "@vanilla-extract/css";

const ref = createContainer("gameTypeSelector");

export const gameTypeButtons = style({
  containerName: ref,
  containerType: "normal",

  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1rem",
  flexGrow: "1",
});

export const gameTypeButton = style({
  fontWeight: 300,
  lineHeight: "2",
  color: "#fff",
  backgroundColor: "#0000ff",
  flexGrow: "1",
  flexBasis: "0",
});
