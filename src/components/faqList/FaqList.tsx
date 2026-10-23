import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import { colors } from "../../theme/tokens";

interface FaqListProps {
  items: { question: string; answer: string }[];
}

const FaqList = ({ items }: FaqListProps) => {
  return (
    <Box sx={{ borderTop: `1px solid ${colors.line}` }}>
      {items.map((item) => (
        <Accordion
          key={item.question}
          disableGutters
          elevation={0}
          square
          sx={{
            bgcolor: "transparent",
            borderBottom: `1px solid ${colors.line}`,
            "&::before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<Icon name="plus" size={22} />}
            sx={{
              px: 0,
              py: 1,
              "& .MuiAccordionSummary-expandIconWrapper": { color: "text.primary" },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(45deg)" },
            }}
          >
            <Typography variant="h3" component="h3" sx={{ fontSize: "1.125rem", pr: 2 }}>
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
            <Typography sx={{ color: "text.secondary", maxWidth: "44rem" }}>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqList;
