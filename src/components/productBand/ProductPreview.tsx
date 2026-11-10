import { Box, Link, Stack } from "@mui/material";
import type { ProductImageLink } from "../../content/productDetail";
import Icon from "../icon/Icon";
import { colors, effects, motion, radius } from "../../theme/tokens";

interface ProductPreviewProps {
  image: string;
  link?: ProductImageLink;
}

const frame = {
  display: "block",
  overflow: "hidden",
  borderRadius: `${radius.md}px`,
  border: `1px solid ${colors.inkRaised}`,
  boxShadow: effects.shadow,
};

const ProductPreview = ({ image, link }: ProductPreviewProps) => {
  const target = link?.external ? { target: "_blank", rel: "noopener" } : {};
  const picture = (
    <Box
      component="img"
      src={image}
      alt=""
      width={1440}
      height={900}
      loading="lazy"
      decoding="async"
      sx={{ display: "block", width: "100%", height: "auto", transition: `transform ${motion.duration.slow}ms ${motion.ease.out}` }}
    />
  );

  if (!link) {
    return <Box sx={frame}>{picture}</Box>;
  }

  return (
    <Stack spacing={2}>
      <Link href={link.href} {...target} tabIndex={-1} aria-hidden sx={{ ...frame, "&:hover img": { transform: "scale(1.02)" } }}>
        {picture}
      </Link>
      {link.label && (
        <Link
          href={link.href}
          {...target}
          underline="hover"
          color="inherit"
          sx={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 500,
            "& svg": { transition: `transform ${motion.duration.fast}ms ${motion.ease.out}` },
            "&:hover svg": { transform: "translateX(4px)" },
          }}
        >
          {link.label}
          <Icon name="arrowRight" size={18} />
        </Link>
      )}
    </Stack>
  );
};

export default ProductPreview;
