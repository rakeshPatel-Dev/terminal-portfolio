import { useContext } from "react";
import _ from "lodash";
import Scripted from "./Scripted";
import { COW } from "../../data/easterEggs";
import { termContext } from "../Terminal";

const WIDTH = 28;

const wrap = (text: string, width: number): string[] => {
  const lines: string[] = [];
  let line = "";

  text
    .split(/\s+/)
    .filter(Boolean)
    .forEach(word => {
      if (line && line.length + 1 + word.length > width) {
        lines.push(line);
        line = word;
        return;
      }
      line = line ? `${line} ${word}` : word;
    });

  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
};

const Cowsay: React.FC = () => {
  const { arg } = useContext(termContext);

  let text = _.trim(_.join(arg, " "));
  text = _.trim(text, "'"); // remove surrounding single quotes
  text = _.trim(text, '"'); // remove surrounding double quotes
  text = _.trim(text, "`"); // remove surrounding backticks

  const lines = wrap(text || "moo", WIDTH);
  const inner = Math.max(...lines.map(line => line.length));

  const body = lines.map(line => {
    const pad = " ".repeat(Math.max(0, inner - line.length));
    return `< ${line}${pad} >`;
  });

  return (
    <Scripted
      lines={[
        ` ${"_".repeat(inner + 2)}`,
        ...body,
        ` ${"-".repeat(inner + 2)}`,
        ...COW,
      ]}
    />
  );
};

export default Cowsay;
