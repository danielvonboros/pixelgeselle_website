import { Box, type SxProps, type Theme } from "@mui/material";
import { pop, pulse } from "../../theme/keyframes";
import { colors, fonts, motion } from "../../theme/tokens";

interface DefectMarkerProps {
  number: number;
  active?: boolean;
  // Delay of the pop-in animation in ms. Leave out to show the marker without animation.
  appearDelay?: number;
  sx?: SxProps<Theme>;
}

// Square, numbered marker as used in a building inspection report. Shown on the old website and in the list.
const DefectMarker = ({ number, active = false, appearDelay, sx }: DefectMarkerProps) => {
  return (
    <Box
      component="span"
      aria-hidden
      sx={[
        {
          width: 26,
          height: 26,
          flexShrink: 0,
          display: "inline-grid",
          placeItems: "center",
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: "0.75rem",
          lineHeight: 1,
          bgcolor: active ? colors.yellow : colors.ink,
          color: active ? colors.ink : colors.paper,
          transition: `background-color ${motion.duration.fast}ms, color ${motion.duration.fast}ms`,
          animation: [
            appearDelay !== undefined && `${pop} 420ms ${motion.ease.out} ${appearDelay}ms both`,
            active && `${pulse} 1.6s ${motion.ease.out} infinite`,
          ]
            .filter(Boolean)
            .join(", "),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {String(number).padStart(2, "0")}
    </Box>
  );
};

export default DefectMarker;
