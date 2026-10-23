import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import PixelStairs from "../pixelStairs/PixelStairs";
import { colors } from "../../theme/tokens";

export interface ProjectCardProps {
  title: string;
  category: string;
  text: string;
  tone: string;
  image?: string;
  href?: string;
  linkLabel?: string;
  status?: string;
}

const ProjectCard = ({ title, category, text, tone, image, href, linkLabel, status }: ProjectCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{ height: "100%", overflow: "hidden", border: `1px solid ${colors.line}`, display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          aspectRatio: "4 / 3",
          bgcolor: tone,
          display: "grid",
          placeItems: "center",
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        {!image && <PixelStairs
            steps={3}
            pixelsPerStep={2}
            size={14}
            gap={6}
            color={colors.paper}
            accentColor={tone === colors.yellow ? colors.ink : "brand.main"}
          />}
      </Box>
      <Stack spacing={1.5} sx={{ p: 3, flex: 1 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
          {category}
        </Typography>
        <Typography variant="h3" component="h3" sx={{ fontSize: "1.25rem" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", flex: 1 }}>
          {text}
        </Typography>
        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener"
            underline="hover"
            color="inherit"
            sx={{ display: "inline-flex", alignItems: "center", gap: 1, fontWeight: 500, fontSize: "0.9375rem" }}
          >
            {linkLabel ?? "Ansehen"}
            <Icon name="arrowRight" size={18} />
          </Link>
        ) : (
          status && (
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {status}
            </Typography>
          )
        )}
      </Stack>
    </Paper>
  );
};

export default ProjectCard;
