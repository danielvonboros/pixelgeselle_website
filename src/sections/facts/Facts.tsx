import { Box, Container } from "@mui/material";
import FactList from "../../components/factList/FactList";
import { facts, factsLabel } from "../../content/facts";
import { colors, layout } from "../../theme/tokens";

const Facts = () => {
  return (
    <Box
      component="section"
      aria-label={factsLabel}
      sx={{
        bgcolor: colors.card,
        borderTop: `1px solid ${colors.line}`,
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: layout.maxWidth, py: { xs: 5, md: 6 } }}>
        <FactList items={facts} />
      </Container>
    </Box>
  );
};

export default Facts;
