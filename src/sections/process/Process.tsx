import CardGrid from "../../components/cardGrid/CardGrid";
import Section from "../../components/section/Section";
import StepCard from "../../components/stepCard/StepCard";
import { processIntro, steps } from "../../content/process";

const Process = () => {
  return (
    <Section {...processIntro} background="card">
      <CardGrid columns={4}>
        {steps.map((step, index) => (
          <StepCard key={step.title} number={index + 1} {...step} />
        ))}
      </CardGrid>
    </Section>
  );
};

export default Process;
