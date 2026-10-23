import { SvgIcon, type SxProps, type Theme } from "@mui/material";
import { icons, type IconName } from "../../assets/icons";

interface IconProps {
  name: IconName;
  size?: number;
  sx?: SxProps<Theme>;
}

const Icon = ({ name, size = 20, sx }: IconProps) => {
  return (
    <SvgIcon
      component={icons[name]}
      inheritViewBox
      aria-hidden
      sx={[{ fontSize: size, fill: "none" }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
};

export default Icon;
