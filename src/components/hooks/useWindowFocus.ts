import { useEffect } from "react";

export const useWindowFocus = (onFocus: () => void, onBlur: () => void) => {
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);
};
