import { Box } from "@mui/material";
import type { ReactNode } from "react";
import type { ProblemSpot } from "../../content/problems";
import { oldSite } from "../../content/problems";
import { oldSiteStyle } from "../../theme/tokens";

interface OldSitePageProps {
  // Renders the marker for a spot. Returns null when the spot has no marker.
  marker: (spot: ProblemSpot) => ReactNode;
}

const markerSlot = { position: "absolute", top: -6, right: -6 } as const;

// A made-up desktop website from around 2014, drawn at desktop width.
// OldSiteSketch shrinks it into the phone, which is exactly the problem it shows.
const OldSitePage = ({ marker }: OldSitePageProps) => {
  return (
    <Box
      sx={{
        width: oldSiteStyle.pageWidth,
        bgcolor: oldSiteStyle.page,
        color: oldSiteStyle.text,
        fontFamily: oldSiteStyle.font,
        fontSize: 14,
        lineHeight: 1.35,
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          px: 2,
          py: 2.5,
          background: `linear-gradient(180deg, ${oldSiteStyle.bannerFrom}, ${oldSiteStyle.bannerTo})`,
          color: oldSiteStyle.bannerText,
          fontSize: 30,
          fontStyle: "italic",
          textAlign: "center",
          textShadow: "2px 2px 0 rgba(0, 0, 0, 0.35)",
        }}
      >
        {oldSite.banner}
        <Box sx={markerSlot}>{marker("title")}</Box>
      </Box>
      <Box sx={{ my: 1.5, textAlign: "center", color: oldSiteStyle.link, textDecoration: "underline" }}>
        {oldSite.navigation.join("  |  ")}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 2 }}>
        <Box component="ul" sx={{ m: 0, pl: 2.5, color: oldSiteStyle.link, textDecoration: "underline" }}>
          {oldSite.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </Box>
        <Box sx={{ position: "relative" }}>
          <Box component="p" sx={{ m: 0, textAlign: "justify" }}>
            {oldSite.intro}
          </Box>
          <Box sx={markerSlot}>{marker("layout")}</Box>
        </Box>
      </Box>
      <Box sx={{ mt: 2.5, fontSize: 20, fontWeight: 700, textDecoration: "underline" }}>{oldSite.galleryTitle}</Box>
      <Box sx={{ mt: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5 }}>
        {Array.from({ length: oldSite.galleryCount }, (_, index) => (
          <Box
            key={index}
            sx={{
              height: 110,
              display: "grid",
              placeItems: "center",
              border: `2px inset ${oldSiteStyle.rule}`,
              bgcolor: oldSiteStyle.placeholder,
              fontStyle: "italic",
            }}
          >
            {oldSite.galleryPlaceholder}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: "relative",
          mt: 2,
          p: 1.5,
          border: `3px dashed ${oldSiteStyle.black}`,
          bgcolor: oldSiteStyle.construction,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {oldSite.construction}
        <Box sx={markerSlot}>{marker("placeholder")}</Box>
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        <span>{oldSite.updated}</span>
        <Box component="span" sx={{ px: 0.75, bgcolor: oldSiteStyle.black, color: oldSiteStyle.counterText, fontFamily: "monospace" }}>
          {oldSite.counter}
        </Box>
      </Box>
      <Box sx={{ position: "relative", mt: 2, pt: 1, borderTop: `1px solid ${oldSiteStyle.rule}`, fontSize: 12, textAlign: "center" }}>
        {oldSite.credit}
        <Box sx={markerSlot}>{marker("credit")}</Box>
      </Box>
    </Box>
  );
};

export default OldSitePage;
