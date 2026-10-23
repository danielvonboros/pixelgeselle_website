import FaqList from "../../components/faqList/FaqList";
import Section from "../../components/section/Section";
import { faqIntro, faqs } from "../../content/faq";

const Faq = () => {
  return (
    <Section {...faqIntro}>
      <FaqList items={faqs} />
    </Section>
  );
};

export default Faq;
