import { useContext, useEffect } from "react";
import {
  checkRedirect,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../utils/funcs";
import {
  ProjectContainer,
  ProjectDesc,
  ProjectsIntro,
  ProjectTitle,
} from "../styles/Projects.styled";
import { termContext } from "../Terminal";
import Usage from "../Usage";

const Projects: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  /* ===== check current command is redirect ===== */
  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "projects")) {
      projects.forEach(({ id, url }) => {
        id === parseInt(arg[1]) && window.open(url, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  /* ===== check arg is valid ===== */
  const checkArg = () =>
    isArgInvalid(arg, "go", ["1", "2", "3", "4"]) ? (
      <Usage cmd="projects" />
    ) : null;

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <div data-testid="projects">
      <ProjectsIntro>
        “Talk is cheap. Show me the code”? I got you. <br />
        Here are some of my projects you shouldn't misss
      </ProjectsIntro>
      {projects.map(({ id, title, desc }) => (
        <ProjectContainer key={id}>
          <ProjectTitle>{`${id}. ${title}`}</ProjectTitle>
          <ProjectDesc>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
      <Usage cmd="projects" marginY />
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: "SnapHost",
    desc: "A file hosting platform for sharing PDFs and images through fast, expiring links without requiring an account.",
    url: "https://snaphost.dev/",
  },
  {
    id: 2,
    title: "Otrack",
    desc: "An internal order and delivery management system built for Ghardailo Dairy to manage orders, flexible delivery schedules, and daily operations.",
    url: "https://otrack.vercel.app/",
  },
  {
    id: 3,
    title: "Ledg",
    desc: "A personal finance tracker for managing expenses, income, transfers, and spending across multiple spaces.",
    url: "https://ledg.rakeshpatel.me/",
  },
  {
    id: 4,
    title: "isHirable",
    desc: "An AI-powered GitHub profile analyzer that evaluates developer profiles, repositories, and contributions to generate actionable feedback.",
    url: "https://ishirable.vercel.app/",
  },
];

export default Projects;
