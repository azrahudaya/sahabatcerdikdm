import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({
          block: "start"
        });
      });
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [hash, pathname]);

  return null;
}
