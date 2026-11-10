import { Box } from "@mui/material";
import { colors, effects, radius } from "../../theme/tokens";

interface VideoPlayerProps {
  src: string;
  poster: string;
  label: string;
}

const VideoPlayer = ({ src, poster, label }: VideoPlayerProps) => {
  return (
    <Box
      component="video"
      controls
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      width={1920}
      height={1080}
      sx={{
        display: "block",
        width: "100%",
        height: "auto",
        aspectRatio: "16 / 9",
        bgcolor: colors.ink,
        borderRadius: `${radius.md}px`,
        boxShadow: effects.shadow,
      }}
    >
      <source src={src} type="video/mp4" />
    </Box>
  );
};

export default VideoPlayer;
