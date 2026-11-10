import { Box } from "@mui/material";
import { useInView } from "../../hooks/useInView";
import { scrollPage } from "../../theme/keyframes";
import { motion } from "../../theme/tokens";

interface PagePreviewProps {
  // Screenshot of the whole page, top to bottom
  image: string;
  alt: string;
}

const SCROLL_MS = 7000;
const RETURN_MS = 900;

// Lies over the card image. With a mouse it fades in on hover and scrolls down the whole page.
// On touch screens it scrolls up and down on its own while the card is in view.
// The image only loads once the card comes close to the viewport.
const PagePreview = ({ image, alt }: PagePreviewProps) => {
  const [ref, near] = useInView<HTMLDivElement>({ rootMargin: "200px 0px" });

  return (
    <Box ref={ref} sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {near && (
        <Box
          className="page-preview"
          component="img"
          src={image}
          alt={alt}
          decoding="async"
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "auto",
            display: "block",
            opacity: 0,
            transition: `opacity ${motion.duration.fast}ms, top ${RETURN_MS}ms ${motion.ease.out}, transform ${RETURN_MS}ms ${motion.ease.out}`,
            "@media (hover: hover)": {
              ".project-card:hover &": {
                opacity: 1,
                top: "100%",
                transform: "translate3d(0, -100%, 0)",
                transition: `opacity ${motion.duration.fast}ms, top ${SCROLL_MS}ms ${motion.ease.inOut} 250ms, transform ${SCROLL_MS}ms ${motion.ease.inOut} 250ms`,
              },
            },
            "@media (hover: none)": {
              opacity: 1,
              animation: `${scrollPage} ${SCROLL_MS * 2}ms ${motion.ease.inOut} infinite alternate`,
            },
          }}
        />
      )}
    </Box>
  );
};

export default PagePreview;
