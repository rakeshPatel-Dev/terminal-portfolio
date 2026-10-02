import theme from "../components/styles/themes";
import projects from "./projects";
import socials from "./socials";

/**
 * One positional step of a subcommand, eg the `set` in `themes set <name>`.
 * A step is either a fixed keyword or a set of free-choice values.
 */
export type SubcommandStep = {
  literal?: string;
  values?: () => string[];
};

export type Command = {
  cmd: string;
  desc: string;
  tab: number;
  /** Claims the whole trimmed line, for phrases the first token can't match */
  match?: string;
  /** Hidden commands stay out of `help` and out of Tab autocomplete */
  hidden?: boolean;
  /** Discovery id used by the easter egg tracker */
  egg?: string;
  /** Commands that render their own arg handling instead of `Usage: <cmd>` */
  acceptsArgs?: boolean;
  subcommands?: SubcommandStep[];
};

export const commands: Command[] = [
  { cmd: "about", desc: "about Rakesh Patel", tab: 8 },
  { cmd: "clear", desc: "clear the terminal", tab: 8 },
  { cmd: "echo", desc: "print out anything", tab: 9, acceptsArgs: true },
  {
    cmd: "education",
    desc: "my education background",
    tab: 4,
  },
  { cmd: "email", desc: "send an email to me", tab: 8 },
  {
    cmd: "gui",
    desc: "go to my portfolio in GUI",
    tab: 10,
  },
  {
    cmd: "hello",
    match: "hello world",
    desc: "say the obligatory thing",
    tab: 2,
    hidden: true,
    egg: "hello-world",
    acceptsArgs: true,
  },
  { cmd: "help", desc: "check available commands", tab: 9 },
  { cmd: "history", desc: "view command history", tab: 6 },
  {
    cmd: "projects",
    desc: "view projects that I've coded",
    tab: 5,
    acceptsArgs: true,
    subcommands: [
      { literal: "go" },
      { values: () => projects.map(({ id, title }) => `${id}.${title}`) },
    ],
  },
  { cmd: "pwd", desc: "print current working directory", tab: 10 },
  {
    cmd: "rm",
    match: "rm -rf /",
    desc: "delete everything",
    tab: 6,
    hidden: true,
    egg: "rm-rf",
    acceptsArgs: true,
  },
  {
    cmd: "socials",
    desc: "check out my social accounts",
    tab: 6,
    acceptsArgs: true,
    subcommands: [
      { literal: "go" },
      { values: () => socials.map(({ id, title }) => `${id}.${title}`) },
    ],
  },
  {
    cmd: "sudo",
    desc: "do something you absolutely should not",
    tab: 3,
    hidden: true,
    egg: "sudo",
  },
  {
    cmd: "themes",
    desc: "check available themes",
    tab: 7,
    acceptsArgs: true,
    subcommands: [{ literal: "set" }, { values: () => Object.keys(theme) }],
  },
  { cmd: "welcome", desc: "display hero section", tab: 6 },
  { cmd: "whoami", desc: "about current user", tab: 7 },
];

/** Everything `help` and Tab autocomplete are allowed to mention */
export const publicCommands = commands.filter(({ hidden }) => !hidden);

/** Commands that handle their own args instead of falling back to `Usage: <cmd>` */
export const argCommands = commands.filter(({ acceptsArgs }) => acceptsArgs);

/**
 * Every easter egg id that exists, including ones fired by effects rather than
 * commands. Kept separate from `commands` so `totalEggs` stays stable.
 */
export const EGG_ROSTER: string[] = ["hello-world", "rm-rf", "sudo"];
