import { useContext } from "react";
import Scripted from "./Scripted";
import { publicCommands } from "../../data/commands";
import { MAN_NOTES } from "../../data/manPages";
import { termContext } from "../Terminal";

const INDENT = "     ";

const Man: React.FC = () => {
  const { arg } = useContext(termContext);

  const asked = (arg[0] ?? "").trim();
  const match = publicCommands.find(({ cmd }) => cmd === asked);
  const notes = match ? MAN_NOTES[match.cmd] : undefined;

  if (!match || !notes) {
    return (
      <Scripted
        lines={[`No manual entry for ${asked || "that"}.`]}
        muted={
          asked
            ? ["", "The man pages cover the documented commands only."]
            : ["", "What manual page do you want?"]
        }
      />
    );
  }

  const seeAlso = publicCommands
    .filter(({ cmd }) => cmd !== match.cmd && MAN_NOTES[cmd])
    .slice(0, 6)
    .map(({ cmd }) => cmd)
    .join(", ");

  return (
    <Scripted
      lines={[
        `${match.cmd.toUpperCase()}(1)`,
        "",
        "NAME",
        `${INDENT}${match.cmd} - ${match.desc}`,
        "",
        "SYNOPSIS",
        `${INDENT}${notes.synopsis}`,
        "",
        "DESCRIPTION",
        `${INDENT}${notes.description}`,
        "",
        "SEE ALSO",
        `${INDENT}${seeAlso}`,
      ]}
    />
  );
};

export default Man;
