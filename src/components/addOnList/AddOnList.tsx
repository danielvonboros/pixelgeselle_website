import { Box, Stack, Typography } from "@mui/material";
import { colors, fonts } from "../../theme/tokens";

interface AddOn {
  name: string;
  text: string;
  price: string;
}

interface AddOnListProps {
  title: string;
  lead: string;
  items: AddOn[];
}

const AddOnList = ({ title, lead, items }: AddOnListProps) => {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {lead}
        </Typography>
      </Stack>
      <Box
        component="ul"
        sx={{ m: 0, p: 0, listStyle: "none", display: "grid", columnGap: 5, gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" } }}
      >
        {items.map((item) => (
          <Box component="li" key={item.name} sx={{ py: 2, borderTop: `1px solid ${colors.line}` }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.name}
              </Typography>
              <Typography component="span" sx={{ fontFamily: fonts.display, fontWeight: 500, whiteSpace: "nowrap" }}>
                {item.price}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default AddOnList;
