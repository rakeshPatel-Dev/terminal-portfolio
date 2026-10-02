import About from "../components/commands/About";
import Clear from "../components/commands/Clear";
import Echo from "../components/commands/Echo";
import Education from "../components/commands/Education";
import Email from "../components/commands/Email";
import GeneralOutput from "../components/commands/GeneralOutput";
import Gui from "../components/commands/Gui";
import Help from "../components/commands/Help";
import History from "../components/commands/History";
import Projects from "../components/commands/Projects";
import Socials from "../components/commands/Socials";
import Sudo from "../components/commands/Sudo";
import Themes from "../components/commands/Themes";
import Welcome from "../components/commands/Welcome";

/**
 * Lazily built so the JSX is created at render time rather than module
 * evaluation time, which keeps this out of the commands <-> Terminal cycle.
 */
export const getRenderer = (cmd: string): React.ReactNode =>
  ({
    about: <About />,
    clear: <Clear />,
    echo: <Echo />,
    education: <Education />,
    email: <Email />,
    gui: <Gui />,
    help: <Help />,
    history: <History />,
    projects: <Projects />,
    pwd: <GeneralOutput>/home/rakesh</GeneralOutput>,
    socials: <Socials />,
    sudo: <Sudo />,
    themes: <Themes />,
    welcome: <Welcome />,
    whoami: <GeneralOutput>visitor</GeneralOutput>,
  }[cmd]);
