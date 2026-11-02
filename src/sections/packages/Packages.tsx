import { Box, Stack, Typography } from "@mui/material";
import AddOnList from "../../components/addOnList/AddOnList";
import IncludedStrip from "../../components/includedStrip/IncludedStrip";
import LaunchOffer from "../../components/launchOffer/LaunchOffer";
import SizeRow from "../../components/sizeRow/SizeRow";
import { sizeColumns } from "../../components/sizeRow/sizeColumns";
import Section from "../../components/section/Section";
import {
  addOns,
  includedEverywhere,
  launchOffer,
  packageOffers,
  packagesIntro,
  packagesNote,
  sizeTable,
} from "../../content/packages";

const Packages = () => {
  return (
    <Section {...packagesIntro}>
      <Stack spacing={{ xs: 5, md: 6 }}>
        <IncludedStrip title={includedEverywhere.title} items={includedEverywhere.items} />
        <Stack spacing={3}>
          <Box
            aria-hidden
            sx={{
              display: { xs: "none", md: "grid" },
              gridTemplateColumns: sizeColumns,
              gap: 5,
              px: 4,
              pt: 1,
            }}
          >
            {[sizeTable.columns.size, sizeTable.columns.content, sizeTable.columns.price].map((column, index) => (
              <Typography key={column} variant="caption" sx={{ fontWeight: 500, color: "text.secondary", pl: index === 2 ? 4 : 0 }}>
                {column}
              </Typography>
            ))}
          </Box>
          <Stack spacing={3}>
            {packageOffers.map((offer) => (
              <SizeRow key={offer.id} offer={offer} />
            ))}
          </Stack>
        </Stack>
        <LaunchOffer {...launchOffer} />
        <AddOnList {...addOns} />
        <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
          {packagesNote}
        </Typography>
      </Stack>
    </Section>
  );
};

export default Packages;
