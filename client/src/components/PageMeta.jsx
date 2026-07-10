import { useEffect } from "react";

const PRODUCT_NAME = "Sahabat CERDIK DM";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function PageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${PRODUCT_NAME}` : PRODUCT_NAME;
    const safeDescription =
      description || "Aplikasi informasi pencegahan Diabetes Melitus pada perempuan.";

    document.title = fullTitle;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: safeDescription
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: safeDescription
    });
  }, [description, title]);

  return null;
}
