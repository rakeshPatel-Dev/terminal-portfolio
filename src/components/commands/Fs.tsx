import { useContext } from "react";
import Scripted from "./Scripted";
import { termContext } from "../Terminal";
import {
  FsNode,
  basename,
  isDir,
  HOME,
  nodeAt,
  resolvePath,
} from "../../data/filesystem";

/**
 * Resolves the working directory as of the entry being rendered. History is
 * newest first, so everything older than this entry is the state that preceded
 * it. Deriving from history rather than component state is what keeps the
 * scrollback honest across the remounts that every keystroke causes.
 */
export const cwdAt = (history: string[], index: number): string => {
  let cwd = HOME;

  for (const cmd of history.slice(index).reverse()) {
    const [name, ...arg] = cmd.trim().split(/\s+/);

    if (name !== "cd") continue;

    if (arg[0] === "~") {
      cwd = HOME;
      continue;
    }

    const target = resolvePath(cwd, arg[0] ?? "~");

    if (isDir(nodeAt(target))) cwd = target;
  }

  return cwd;
};

/** One-line summary of a node, the way `ls -l` would describe it */
export const describeNode = (node: FsNode, name: string): string => {
  if (isDir(node)) return `drwxr-xr-x  rakesh  ${name}`;
  return `-rw-r--r--  rakesh  ${name}`;
};

const nameOf = (path: string): string => basename(path);

const Cd: React.FC = () => {
  const { history, index, arg } = useContext(termContext);

  // everything strictly older than this entry, since this command has not
  // taken effect yet at the moment it is rendered
  const cwd = cwdAt(history, index + 1);
  const target = arg[0] ?? "~";
  const path = resolvePath(cwd, target);

  if (!isDir(nodeAt(path))) {
    return (
      <Scripted
        lines={[`cd: ${arg[0]}: No such file or directory`]}
        muted={["", "Try cd .. or ls to see where you are."]}
      />
    );
  }

  return null;
};

export { Cd };

const FsCommand: React.FC<{ mode: "ls" | "cat" | "pwd" }> = ({ mode }) => {
  const { history, index, arg } = useContext(termContext);
  const cwd = cwdAt(history, index);
  const target = arg[0];

  if (mode === "pwd") return <Scripted lines={[cwd]} />;

  if (!target) {
    if (mode === "cat") {
      return (
        <Scripted
          lines={["cat: missing operand"]}
          muted={["", "cat needs a file: cat about.txt"]}
        />
      );
    }

    const node = nodeAt(cwd);
    const names = Object.keys(node?.children ?? {});

    if (names.length === 0) {
      return <Scripted lines={["(empty)"]} />;
    }

    return <Scripted lines={[names.join("  ")]} />;
  }

  const path = resolvePath(cwd, target);
  const node = nodeAt(path);

  if (!node) {
    return (
      <Scripted
        lines={[`${mode}: ${target}: No such file or directory`]}
        muted={["", "Try ls to see what is here."]}
      />
    );
  }

  if (isDir(node)) {
    const names = Object.keys(node.children ?? {});

    return (
      <Scripted
        lines={[
          `${mode}: ${target}: Is a directory`,
          ...(names.length > 0 ? ["", `Try: cd ${target}`] : []),
        ]}
      />
    );
  }

  const lines = (node.content ?? "").replace(/\n$/, "").split("\n");

  if (mode === "ls") {
    return <Scripted lines={[describeNode(node, nameOf(path))]} />;
  }

  return <Scripted lines={lines} />;
};

export default FsCommand;
