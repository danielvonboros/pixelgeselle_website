import { Box } from "@mui/material";
import { useState } from "react";
import DefectList from "../../components/defectList/DefectList";
import OldSiteSketch from "../../components/oldSiteSketch/OldSiteSketch";
import Reveal from "../../components/reveal/Reveal";
import Section from "../../components/section/Section";
import { defectList, problems, problemsIntro } from "../../content/problems";
import { useAutoCycle } from "../../hooks/useAutoCycle";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const CYCLE_MS = 3200;

const Problems = () => {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>();
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useAutoCycle(problems.length, CYCLE_MS, inView && !hovering && !reduced);

  const activate = (index: number) => {
    setHovering(true);
    setActive(index);
  };

  return (
    <Section {...problemsIntro}>
      <Box
        ref={ref}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        <Reveal>
          <OldSiteSketch spots={problems.map((problem) => problem.spot)} active={active} shown={inView} />
        </Reveal>
        <Reveal delay={120}>
          <DefectList
            {...defectList}
            items={problems}
            active={active}
            onActivate={activate}
            onRelease={() => setHovering(false)}
          />
        </Reveal>
      </Box>
    </Section>
  );
};

export default Problems;
