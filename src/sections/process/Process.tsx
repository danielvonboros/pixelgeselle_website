import Schedule from "../../components/schedule/Schedule";
import Section from "../../components/section/Section";
import { processIntro, schedule, steps } from "../../content/process";

const Process = () => {
  return (
    <Section {...processIntro} background="card">
      <Schedule steps={steps} {...schedule} />
    </Section>
  );
};

export default Process;
