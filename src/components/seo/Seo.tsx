import { useEffect } from "react";

interface SeoProps {
  title?: string;
  noIndex?: boolean;
}

const baseTitle = "Website für Handwerker zum Festpreis | Pixelgeselle Berlin";

const Seo = ({ title, noIndex = false }: SeoProps) => {
  useEffect(() => {
    document.title = title ? `${title} | Pixelgeselle` : baseTitle;
    document.head
      .querySelector('meta[name="robots"]')
      ?.setAttribute("content", noIndex ? "noindex, follow" : "index, follow");
  }, [title, noIndex]);

  return null;
};

export default Seo;
