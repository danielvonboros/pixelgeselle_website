import { Box, ButtonBase } from "@mui/material";
import { colors, fonts, motion, radius } from "../../theme/tokens";

interface ModeOption<T extends string> {
  id: T;
  label: string;
}

interface ModeSwitchProps<T extends string> {
  options: ModeOption<T>[];
  value: T;
  label: string;
  onChange: (value: T) => void;
}

const ModeSwitch = <T extends string>({ options, value, label, onChange }: ModeSwitchProps<T>) => {
  const activeIndex = Math.max(0, options.findIndex((option) => option.id === value));

  return (
    <Box
      role="group"
      aria-label={label}
      sx={{
        position: "relative",
        display: "inline-grid",
        gridAutoFlow: "column",
        gridAutoColumns: "1fr",
        alignSelf: "flex-start",
        p: 0.5,
        bgcolor: colors.card,
        border: `1px solid ${colors.line}`,
        borderRadius: `${radius.md}px`,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 4,
          width: `calc((100% - 8px) / ${options.length})`,
          bgcolor: colors.ink,
          borderRadius: `${radius.md - 2}px`,
          transform: `translateX(${activeIndex * 100}%)`,
          transition: `transform 450ms ${motion.ease.spring}`,
        }}
      />
      {options.map((option) => {
        const active = option.id === value;
        return (
          <ButtonBase
            key={option.id}
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            sx={{
              position: "relative",
              minHeight: 40,
              px: 3,
              borderRadius: `${radius.md - 2}px`,
              fontFamily: fonts.display,
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: active ? colors.paper : colors.ink,
              transition: `color ${motion.duration.fast}ms`,
            }}
          >
            {option.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
};

export default ModeSwitch;
