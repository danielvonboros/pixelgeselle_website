import { Button } from "@mui/material";
import Icon from "../../components/icon/Icon";
import Section from "../../components/section/Section";
import type { ProductDetail } from "../../content/productDetail";
import { colors } from "../../theme/tokens";

interface ProductContactProps {
  contact: ProductDetail["contact"];
}

const ProductContact = ({ contact }: ProductContactProps) => {
  return (
    <Section title={contact.title} lead={contact.lead} background="brand">
      <Button
        variant="contained"
        size="large"
        href={contact.action.href}
        endIcon={<Icon name="arrowRight" size={18} />}
        sx={{ bgcolor: colors.ink, color: colors.paper, "&:hover": { bgcolor: colors.inkRaised } }}
      >
        {contact.action.label}
      </Button>
    </Section>
  );
};

export default ProductContact;
