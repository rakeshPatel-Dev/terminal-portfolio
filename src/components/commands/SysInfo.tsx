import { useContext } from "react";
import Scripted from "./Scripted";
import { SYSINFO } from "../../data/easterEggs";
import { termContext } from "../Terminal";

export type SysInfoKind = "id" | "uname" | "uptime" | "ps" | "df" | "env";

type Props = {
  kind: SysInfoKind;
};

const SysInfo: React.FC<Props> = ({ kind }) => {
  const { arg } = useContext(termContext);

  switch (kind) {
    case "uname":
      return (
        <Scripted
          lines={arg.includes("-a") ? SYSINFO.unameAll : SYSINFO.unameShort}
        />
      );
    case "ps":
      return (
        <Scripted lines={arg.length > 0 ? SYSINFO.psAux : SYSINFO.psBare} />
      );
    case "df":
      return <Scripted lines={arg.length > 0 ? SYSINFO.dfH : SYSINFO.dfBare} />;
    case "uptime":
      return <Scripted lines={SYSINFO.uptime} />;
    case "env":
      return <Scripted lines={SYSINFO.env} />;
    case "id":
    default:
      return <Scripted lines={SYSINFO.id} />;
  }
};

export default SysInfo;
