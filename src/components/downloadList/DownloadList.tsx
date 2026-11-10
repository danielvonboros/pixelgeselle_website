import { Box, Link, Stack, Typography } from "@mui/material";
import type { ProductDownload } from "../../content/productDetail";
import Icon from "../icon/Icon";
import { colors, motion } from "../../theme/tokens";

interface DownloadListProps {
  items: ProductDownload[];
}

const DownloadList = ({ items }: DownloadListProps) => {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
      {items.map((item) => (
        <Box component="li" key={item.href} sx={{ borderTop: `1px solid ${colors.line}`, "&:last-of-type": { borderBottom: `1px solid ${colors.line}` } }}>
          <Link
            href={item.href}
            download
            underline="none"
            color="inherit"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr auto", md: "minmax(0, 4fr) minmax(0, 6fr) auto" },
              gap: { xs: 1, md: 4 },
              alignItems: "center",
              py: 3,
              "& .download-icon": { transition: `transform ${motion.duration.fast}ms ${motion.ease.out}` },
              "&:hover .download-icon": { transform: "translateY(3px) rotate(90deg)" },
              "&:hover .download-title": { textDecoration: "underline", textUnderlineOffset: "4px" },
            }}
          >
            <Stack spacing={0.5} sx={{ gridColumn: { xs: 1, md: "auto" }, gridRow: { xs: 1, md: "auto" } }}>
              <Typography className="download-title" variant="h3" component="span" sx={{ fontSize: "1.25rem" }}>
                {item.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {item.details}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "text.secondary", gridColumn: { xs: "1 / -1", md: "auto" }, gridRow: { xs: 2, md: "auto" } }}>
              {item.text}
            </Typography>
            <Box className="download-icon" aria-hidden sx={{ display: "inline-flex", transform: "rotate(90deg)", gridColumn: { xs: 2, md: "auto" }, gridRow: { xs: 1, md: "auto" } }}>
              <Icon name="arrowRight" size={22} />
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default DownloadList;
