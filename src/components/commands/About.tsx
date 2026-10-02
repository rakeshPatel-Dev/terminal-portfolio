import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>Rakesh Patel</HighlightSpan>!
      </p>
      <p>
        I'm <HighlightAlt>a full-stack developer</HighlightAlt> based in
        Kathmandu, Nepal.
      </p>
      <p>
        I have a passion for building{" "}
        <HighlightAlt>web applications</HighlightAlt> and
        <HighlightAlt>exploring new technologies</HighlightAlt>. I enjoy working
        on
        <HighlightAlt>challenging projects</HighlightAlt> that allow me to learn
        and grow as a developer.
      </p>
    </AboutWrapper>
  );
};

export default About;
