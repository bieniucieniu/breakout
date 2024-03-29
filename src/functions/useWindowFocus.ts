import { useEffect } from "react";

export const useWindowFocus = (onFocus?: () => void, onBlur?: () => void) => {
  useEffect(() => {
    if (onFocus) window.addEventListener("focus", onFocus);
    if (onBlur) window.addEventListener("blur", onBlur);

    return () => {
      if (onFocus) window.removeEventListener("focus", onFocus);
      if (onBlur) window.removeEventListener("blur", onBlur);
    };
  }, []);
};
