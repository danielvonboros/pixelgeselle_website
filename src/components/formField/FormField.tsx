import { Box, InputBase, Typography } from "@mui/material";
import { useId, type HTMLAttributes, type ReactNode } from "react";
import { colors, fonts, motion, radius } from "../../theme/tokens";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  optionalLabel?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  inputWidth?: number | string;
  after?: ReactNode;
  inputRef?: (node: HTMLInputElement | HTMLTextAreaElement | null) => void;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  optionalLabel,
  required = false,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  multiline = false,
  rows,
  disabled = false,
  inputWidth = "100%",
  after,
  inputRef,
}: FormFieldProps) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography
        component="label"
        htmlFor={id}
        variant="body2"
        sx={{ fontFamily: fonts.display, fontWeight: 500, display: "flex", gap: 0.75, alignItems: "baseline" }}
      >
        {label}
        {optionalLabel && (
          <Box component="span" sx={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: "0.8125rem", color: "text.secondary" }}>
            {optionalLabel}
          </Box>
        )}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <InputBase
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          multiline={multiline}
          minRows={rows}
          disabled={disabled}
          required={required}
          inputRef={inputRef}
          inputProps={{
            inputMode,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
          }}
          sx={{
            width: inputWidth,
            fontSize: "1rem",
            bgcolor: colors.card,
            border: `1px solid ${error ? colors.brick : colors.border}`,
            borderRadius: `${radius.md}px`,
            px: 1.75,
            py: multiline ? 1.5 : 0,
            minHeight: 48,
            transition: `border-color ${motion.duration.fast}ms, box-shadow ${motion.duration.fast}ms`,
            "&:hover": { borderColor: error ? colors.brick : colors.ink },
            "&.Mui-focused": {
              borderColor: colors.ink,
              boxShadow: `0 0 0 3px ${colors.yellow}`,
            },
            "& textarea": { resize: "vertical" },
            "& ::placeholder": { color: colors.inkMuted, opacity: 1 },
          }}
        />
        {after}
      </Box>
      {error && (
        <Typography id={errorId} variant="caption" sx={{ color: colors.brick, fontWeight: 500 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FormField;
