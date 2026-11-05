import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import App from "./App";
import { createAppTheme } from "./theme/theme";

const theme = createAppTheme();

interface RootProps {
  cache: EmotionCache;
  path: string;
}

const Root = ({ cache, path }: RootProps) => {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App path={path} />
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  );
};

export default Root;
