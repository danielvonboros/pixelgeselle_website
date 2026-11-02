import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface VisuallyHiddenProps {
  children: ReactNode;
}

const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return (
    <Box
      component="span"
      sx={{
        position: "absolute",
        width: 1,
        height: 1,
        p: 0,
        m: "-1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {children}
    </Box>
  );
};

export default VisuallyHidden;
