import { useEffect } from "react";

const SITE = "MASF & Partners Limited";
const DEFAULT_TITLE = `${SITE} — Environmental & Engineering Consultancy, Abuja`;

/**
 * Sets the document title and description (plus matching Open Graph tags)
 * for the current page. SPA equivalent of per-page <head> metadata.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : DEFAULT_TITLE;
    document.title = fullTitle;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }

    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", fullTitle);
    if (description) {
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", description);
    }
  }, [title, description]);
}
