import { style } from "@vanilla-extract/css";

export const errorStyle = style({
  position: "absolute",
  top: "80px",
  left: "0",
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: "1",
});

export const authButton = style({
  position: "relative",
  width: "100%",
  height: "100%",
  margin: "12px 16px",
  borderRadius: "3px",
  padding: "12px 16px 12px 16px",
  border: "none",
  color: "#757575",
  fontSize: "14px",
  fontWeight: "500",
  fontFamily: "Roboto Mono, sans-serif",
});

export const googleButton = style([
  authButton,
  {
    position: "relative",
    padding: "12px 16px 12px 42px",
    transition: "background-color .3s, box-shadow .3s",
    borderRadius: "3px",
    boxShadow: "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",

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
  },
]);
