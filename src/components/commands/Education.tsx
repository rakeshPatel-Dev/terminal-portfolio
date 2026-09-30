import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <EduIntro>Here is my education background!</EduIntro>
      {eduBg.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

const eduBg = [
  {
    title: "Bachelor of Information Technology Management(BITM)",
    desc: "Tribhuvan University | 2025 - 2029(expected)",
  },
  {
    title: "FullStack Web Development(MERN Stack)",
    desc: "Lets Learn IT | 2025",
  },
  {
    title: "+2 Management ( Major: Computer Science )",
    desc: "Makawanpur Multiple Campus | 2023 - 2025",
  },
];

export default Education;
