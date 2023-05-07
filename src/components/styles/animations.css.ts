import { keyframes } from "@vanilla-extract/css";

export const appearFromTop = keyframes({
  "0%": {
    transform: "translateY(-100%)",
  },
  "100%": {
    transform: "translateY(0)",
  },
});

export const appearFromBottom = keyframes({
  "0%": {
    transform: "translateY(100%)",
  },
  "100%": {
    transform: "translateY(0)",
  },
});
