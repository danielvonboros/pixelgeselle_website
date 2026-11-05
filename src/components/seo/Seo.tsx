import { useEffect } from "react";
import { pageTitle, robots } from "../../content/seo";

interface SeoProps {
  title?: string;
  noIndex?: boolean;
}

const Seo = ({ title, noIndex = false }: SeoProps) => {
  useEffect(() => {
    document.title = pageTitle(title);
    document.head.querySelector('meta[name="robots"]')?.setAttribute("content", robots(noIndex));
  }, [title, noIndex]);

  return null;
};

export default Seo;
