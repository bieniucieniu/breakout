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
  position: "relative",
  width: "100%",
  height: "100%",
});

export const errorStyle = style({
  position: "absolute",
  top: "36px",
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: "1",
});

export const googleButton = style({
  transition: "background-color .3s, box-shadow .3s",
  padding: "12px 16px 12px 42px",
  border: "none",
  borderRadius: "3px",
  boxShadow: "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
  color: "#757575",
  fontSize: "14px",
  fontWeight: "500",
  fontFamily: "Roboto Mono, sans-serif",
  margin: "0 ",

  ":before": {
    content: "''",
    position: "absolute",
    top: "50%",
    left: "10px",
    width: "20px",
    height: "20px",
    marginTop: "-9px",
    backgroundImage:
      "url(https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg)",
    backgroundSize: "20px 20px",
  },
});

globalStyle(`${authStyle}>div`, {
  fontSize: "14px",
  padding: "12px 16px 12px 42px",
  fontWeight: "500",
  border: "none",
});
