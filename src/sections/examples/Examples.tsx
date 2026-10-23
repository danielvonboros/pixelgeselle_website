import CardGrid from "../../components/cardGrid/CardGrid";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Section from "../../components/section/Section";
import { examples, examplesIntro } from "../../content/examples";

const Examples = () => {
  return (
    <Section {...examplesIntro} background="card">
      <CardGrid columns={3}>
        {examples.map((example) => (
          <ProjectCard key={example.title} {...example} />
        ))}
      </CardGrid>
    </Section>
  );
};

export default Examples;
