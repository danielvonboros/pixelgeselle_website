import { useEffect } from "react";
import { site } from "../../content/site";

interface SeoProps {
  title?: string;
  noIndex?: boolean;
}

const baseTitle = `Website für Handwerker zum Festpreis | ${site.name}`;

const Seo = ({ title, noIndex = false }: SeoProps) => {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : baseTitle;
    document.head
      .querySelector('meta[name="robots"]')
      ?.setAttribute("content", noIndex ? "noindex, follow" : "index, follow");
  }, [title, noIndex]);

  return null;
};

export default Seo;
