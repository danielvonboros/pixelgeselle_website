import { Box, Stack } from "@mui/material";
import type { ProblemSpot } from "../../content/problems";
import { oldSite } from "../../content/problems";
import { colors, effects, oldSiteStyle } from "../../theme/tokens";
import DefectMarker from "../defectMarker/DefectMarker";
import OldSitePage from "./OldSitePage";

interface OldSiteSketchProps {
  // Spots in the order of the defect list. The position gives the marker number.
  spots: ProblemSpot[];
  active: number;
  // Markers pop in once this is true.
  shown: boolean;
}

const scale = oldSiteStyle.screenWidth / oldSiteStyle.pageWidth;

// A phone that shows an old desktop website, shrunk until nothing is readable, with numbered markers on its defects.
const OldSiteSketch = ({ spots, active, shown }: OldSiteSketchProps) => {
  const marker = (spot: ProblemSpot) => {
    const index = spots.indexOf(spot);
    if (index < 0 || !shown) return null;
    return (
      <Box sx={{ transform: `scale(${1 / scale})`, transformOrigin: "top right" }}>
        <DefectMarker number={index + 1} active={index === active} appearDelay={300 + index * 160} />
      </Box>
    );
  };

  return (
    <Box
      aria-hidden
      sx={{
        width: oldSiteStyle.screenWidth + 20,
        mx: "auto",
        p: "10px",
        borderRadius: "36px",
        bgcolor: oldSiteStyle.phone,
        boxShadow: effects.shadow,
        transform: "rotate(-2deg)",
        userSelect: "none",
      }}
    >
      <Box sx={{ overflow: "hidden", borderRadius: "26px", bgcolor: oldSiteStyle.page }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center", height: 30, bgcolor: colors.card }}
        >
          <Box sx={{ width: 72, height: 18, borderRadius: 9, bgcolor: oldSiteStyle.phone }} />
        </Stack>
        <Box sx={{ px: 1.5, pb: 1, bgcolor: colors.card, borderBottom: `1px solid ${colors.line}` }}>
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: "8px",
              bgcolor: colors.paper,
              color: colors.inkMuted,
              fontSize: "0.6875rem",
              textAlign: "center",
            }}
          >
            {oldSite.address}
          </Box>
        </Box>
        <Box sx={{ position: "relative", height: 360 }}>
          <Box sx={{ position: "absolute", top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <OldSitePage marker={marker} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OldSiteSketch;
