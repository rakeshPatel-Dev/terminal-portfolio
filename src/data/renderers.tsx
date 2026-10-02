import About from "../components/commands/About";
import Clear from "../components/commands/Clear";
import Cowsay from "../components/commands/Cowsay";
import Echo from "../components/commands/Echo";
import Education from "../components/commands/Education";
import Email from "../components/commands/Email";
import Fortune from "../components/commands/Fortune";
import GeneralOutput from "../components/commands/GeneralOutput";
import Gui from "../components/commands/Gui";
import Help from "../components/commands/Help";
import History from "../components/commands/History";
import Projects from "../components/commands/Projects";
import RmRf from "../components/commands/RmRf";
import Scripted from "../components/commands/Scripted";
import Socials from "../components/commands/Socials";
import Sudo from "../components/commands/Sudo";
import SysInfo from "../components/commands/SysInfo";
import Themes from "../components/commands/Themes";
import Welcome from "../components/commands/Welcome";
import Xyzzy from "../components/commands/Xyzzy";
import { CLOSERS } from "./easterEggs";

/**
 * Lazily built so the JSX is created at render time rather than module
 * evaluation time, which keeps this out of the commands <-> Terminal cycle.
 */
export const getRenderer = (cmd: string): React.ReactNode =>
  ({
    about: <About />,
    clear: <Clear />,
    cowsay: <Cowsay />,
    df: <SysInfo kind="df" />,
    echo: <Echo />,
    education: <Education />,
    email: <Email />,
    env: <SysInfo kind="env" />,
    exit: <Scripted lines={[CLOSERS[0]]} />,
    fortune: <Fortune />,
    gui: <Gui />,
    hello: (
      <GeneralOutput>
        Hello, world. Nobody has ever typed this for the first time.
      </GeneralOutput>
    ),
    help: <Help />,
    history: <History />,
    id: <SysInfo kind="id" />,
    ps: <SysInfo kind="ps" />,
    projects: <Projects />,
    pwd: <GeneralOutput>/home/rakesh</GeneralOutput>,
    quit: <Scripted lines={[CLOSERS[1]]} />,
    rm: <RmRf />,
    socials: <Socials />,
    sudo: <Sudo />,
    themes: <Themes />,
    uname: <SysInfo kind="uname" />,
    uptime: <SysInfo kind="uptime" />,
    welcome: <Welcome />,
    whoami: <GeneralOutput>visitor</GeneralOutput>,
    xyzzy: <Xyzzy />,
  }[cmd]);
