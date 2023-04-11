import { globalStyle, style } from "@vanilla-extract/css";

// export const googleButton = style({
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "#fff",
//   color: "#757575",
//   borderRadius: "4px",
//   border: "1px solid #ddd",
//   boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
//   height: "36px",
//   padding: "0 16px",
//   fontSize: "14px",
//   fontWeight: "500",
//   cursor: "pointer",

//   ":hover": {
//     backgroundColor: "#fafafa",
//     border: "1px solid #ccc",
//   },
// });

export const authStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "56px",
  fontSize: "14px",
});

globalStyle(`${authStyle}>button`, {
  alignItems: "center",
  height: "36px",
  fontSize: "14px",
  padding: "inherit",
  backgroundColor: "#fff",
  color: "#757575",
  borderRadius: "4px",
  border: "1px solid #ddd",
  boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
  fontWeight: "500",
  cursor: "pointer",
});

globalStyle(`${authStyle}>span`, {
  fontSize: "14px",
});
