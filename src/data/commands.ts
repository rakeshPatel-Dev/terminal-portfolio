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

const egg = (
  cmd: string,
  desc: string,
  tab: number,
  eggId: string,
  args = true
): Command => ({
  cmd,
  desc,
  tab,
  // a multi-word command needs to match the whole line, otherwise only the
  // first token resolves and the rest falls through to "command not found"
  match: cmd.includes(" ") ? cmd : undefined,
  hidden: true,
  egg: eggId,
  acceptsArgs: args,
});

export const commands: Command[] = [
  { cmd: "about", desc: "about Rakesh Patel", tab: 8 },
  { cmd: "clear", desc: "clear the terminal", tab: 8 },
  egg("cowsay", "have something said, by a cow", 2, "cowsay"),
  egg("df", "report file system free space", 8, "df"),
  { cmd: "echo", desc: "print out anything", tab: 9, acceptsArgs: true },
  { cmd: "education", desc: "my education background", tab: 4 },
  { cmd: "email", desc: "send an email to me", tab: 8 },
  egg("env", "print the environment", 6, "env"),
  egg("exit", "leave the terminal", 7, "exit"),
  egg("fortune", "a saying, at no charge", 3, "fortune"),
  egg("git log", "the commit history of this portfolio", 4, "git-log"),
  { cmd: "gui", desc: "go to my portfolio in GUI", tab: 10 },
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
  egg("id", "print the current user id", 8, "id"),
  egg("curl", "fetch a url over the network", 1, "curl"),
  egg("ps", "report process status", 8, "ps"),
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
  egg("man", "read a manual page", 6, "man", true),
  egg("quit", "leave the terminal", 7, "quit"),
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
    desc: "do something you should not",
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
  egg("uname", "print system information", 5, "uname"),
  egg("uptime", "show how long this has been running", 4, "uptime"),
  { cmd: "welcome", desc: "display hero section", tab: 6 },
  { cmd: "whoami", desc: "about current user", tab: 7 },
  egg("xyzzy", "a magic word", 5, "xyzzy"),
];

/** Everything `help` and Tab autocomplete are allowed to mention */
export const publicCommands = commands.filter(({ hidden }) => !hidden);

/** Commands that handle their own args instead of falling back to `Usage: <cmd>` */
export const argCommands = commands.filter(({ acceptsArgs }) => acceptsArgs);

/**
 * Every easter egg id that exists, including ones fired by effects rather than
 * commands. Kept separate from `commands` so `totalEggs` stays stable.
 */
export const EGG_ROSTER: string[] = commands
  .map(({ egg: id }) => id)
  .filter((id): id is string => Boolean(id));
