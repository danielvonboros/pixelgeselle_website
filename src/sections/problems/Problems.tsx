import CardGrid from "../../components/cardGrid/CardGrid";
import InfoCard from "../../components/infoCard/InfoCard";
import Section from "../../components/section/Section";
import { problems, problemsIntro } from "../../content/problems";

const Problems = () => {
  return (
    <Section {...problemsIntro}>
      <CardGrid columns={4}>
        {problems.map((problem) => (
          <InfoCard key={problem.title} {...problem} />
        ))}
      </CardGrid>
    </Section>
  );
};

export default Problems;
