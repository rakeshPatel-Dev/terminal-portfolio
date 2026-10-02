/**
 * Extra man page sections for commands that need more than the one line the
 * registry carries. Commands without an entry here get a generated page.
 */
export const MAN_NOTES: Record<
  string,
  { synopsis: string; description: string }
> = {
  about: {
    synopsis: "about",
    description:
      "Prints who this portfolio belongs to. Roughly one paragraph, no bragging.",
  },
  clear: {
    synopsis: "clear",
    description: "Clears the scrollback. The commands you ran are gone.",
  },
  cowsay: {
    synopsis: "cowsay <text>",
    description:
      "Repeats the given text inside a speech bubble above a cow. The cow is decorative and has no opinions about your input.",
  },
  df: {
    synopsis: "df [-h]",
    description:
      "Reports file system free space. The figures are fiction, but the filesystem really is full, mostly of things like this.",
  },
  echo: {
    synopsis: "echo <text>",
    description:
      "Prints its arguments back. Surrounding single quotes, double quotes and backticks are trimmed.",
  },
  education: {
    synopsis: "education",
    description: "Lists where the schooling happened, oldest last.",
  },
  email: {
    synopsis: "email",
    description: "Opens the default mail client with the address pre-filled.",
  },
  env: {
    synopsis: "env",
    description:
      "Prints the environment. Note the pair of variables at the bottom; they are the honest ones.",
  },
  exit: {
    synopsis: "exit",
    description:
      "Attempts to end the session. There is no session to end and no outside to return to.",
  },
  fortune: {
    synopsis: "fortune",
    description:
      "Prints a saying at random. Attributed to nobody, which is how most of them arrived.",
  },
  gui: {
    synopsis: "gui",
    description:
      "Opens the same portfolio in a browser, for anyone who would rather not read a terminal.",
  },
  help: {
    synopsis: "help",
    description:
      "Lists every command this terminal will admit to. It is not the full list.",
  },
  history: {
    synopsis: "history",
    description: "Lists the commands run so far in this session, newest first.",
  },
  projects: {
    synopsis: "projects go <number>",
    description:
      "With no arguments, lists the projects. With 'go' and a number, opens that project in a browser.",
  },
  pwd: {
    synopsis: "pwd",
    description: "Prints the working directory, which has never changed.",
  },
  quit: {
    synopsis: "quit",
    description: "Same as exit, and equally pointless.",
  },
  socials: {
    synopsis: "socials go <number>",
    description:
      "With no arguments, lists the accounts. With 'go' and a number, opens that account in a browser.",
  },
  themes: {
    synopsis: "themes set <name>",
    description:
      "With no arguments, lists the available themes. With 'set' and a name, switches to it and remembers the choice for next time.",
  },
  uptime: {
    synopsis: "uptime",
    description:
      "Reports how long this has been running. The load average is flattering.",
  },
  welcome: {
    synopsis: "welcome",
    description:
      "Prints the opening section. It is also printed when the page loads.",
  },
  whoami: {
    synopsis: "whoami",
    description: "Prints who you are. The answer does not change.",
  },
};

/**
 * Commands with a man page that lives outside the registry, listed under
 * SEE ALSO on the help-ish pages.
 */
export const GIT_LOG: string[] = [
  "commit 9f2c1ab8e4d3b6a0f5c2e8d1a7b4c3e9f0d2a6b1",
  "Author: Rakesh Patel <rk5080976@gmail.com>",
  "Date:   2 days ago",
  "",
  "    stop trying to make fetch happen",
  "",
  " 14 files changed, 812 insertions(+), 1104 deletions(-)",
  "",
  "commit 3c8e1d4f7a9b2c5e8d0f3a6b9c1e4d7f0a3b6c9",
  "Author: Rakesh Patel <rk5080976@gmail.com>",
  "Date:   6 days ago",
  "",
  "    add a command that turns out to be three",
  "",
  " 9 files changed, 402 insertions(+), 88 deletions(-)",
  "",
  "commit b7d4a1c8e5f2a9b6c3d0e7f4a1b8c5e2d9f6a3b0",
  "Author: Rakesh Patel <rk5080976@gmail.com>",
  "Date:   3 weeks ago",
  "",
  "    make it responsive, then make it responsive again",
  "",
  " 22 files changed, 604 insertions(+), 377 deletions(-)",
  "",
  "commit e2f5b8c1a4d7e0b3c6a9f2d5e8b1c4a7f0d3e6b9",
  "Author: Rakesh Patel <rk5080976@gmail.com>",
  "Date:   2 months ago",
  "",
  "    initial commit, mostly arguing with prettier",
  "",
  " 31 files changed, 1204 insertions(+)",
];

export const CURL_RESPONSES: Record<string, string[]> = {
  default: [
    "  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current",
    "                                 Dload  Upload   Total   Spent    Left  Speed",
    "100  1256  100  1256    0     0   4821      0 --:--:-- --:--:-- --  4682",
    "",
    '{"author":"Rakesh Patel","terminal":true,"rss":null}',
  ],
  "/": [
    "  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current",
    "                                 Dload  Upload   Total   Spent    Left  Speed",
    "100   482  100   482    0     0   1204      0 --:--:-- --:--:-- --  1150",
    "",
    "<!doctype html> ... this would be the portfolio if you had asked for HTML",
  ],
  portfolio: [
    "  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current",
    "                                 Dload  Upload   Total   Spent    Left  Speed",
    "100  4821  100  4821    0     0   3102      0 --:--:-- --:--:-- --  2960",
    "",
    "<!doctype html> ... the graphical one, which is worse",
  ],
};
