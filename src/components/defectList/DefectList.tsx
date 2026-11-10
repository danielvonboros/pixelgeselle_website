import { Box, Stack, Typography } from "@mui/material";
import type { Problem } from "../../content/problems";
import { colors, fonts, motion } from "../../theme/tokens";
import DefectMarker from "../defectMarker/DefectMarker";

interface DefectListProps {
  title: string;
  subject: string;
  items: Problem[];
  active: number;
  onActivate: (index: number) => void;
  onRelease: () => void;
}

// Numbered list of problems, styled like a list of defects after a building inspection.
const DefectList = ({ title, subject, items, active, onActivate, onRelease }: DefectListProps) => {
  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", gap: 2, pb: 1.5, borderBottom: `2px solid ${colors.ink}` }}
      >
        <Typography variant="caption" sx={{ fontFamily: fonts.mono, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: fonts.mono, color: colors.inkMuted }}>
          {subject}
        </Typography>
      </Stack>
      <Box component="ol" onPointerLeave={onRelease} sx={{ m: 0, p: 0, listStyle: "none" }}>
        {items.map((item, index) => (
          <Stack
            component="li"
            key={item.spot}
            direction="row"
            spacing={2.5}
            onPointerEnter={() => onActivate(index)}
            onClick={() => onActivate(index)}
            sx={{
              py: 2.5,
              borderBottom: `1px solid ${colors.line}`,
              opacity: index === active ? 1 : 0.62,
              transition: `opacity ${motion.duration.fast}ms ${motion.ease.out}`,
            }}
          >
            <DefectMarker number={index + 1} active={index === active} />
            <Box>
              <Typography variant="h3" sx={{ fontSize: "1.25rem", mb: 0.75 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.inkMuted, maxWidth: "34rem" }}>
                {item.text}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default DefectList;
