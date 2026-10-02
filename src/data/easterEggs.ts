export const FORTUNES: string[] = [
  "A journey of a thousand pages begins with a single request.",
  "You will refactor today. It will not be the refactor you expect.",
  "The bug is not in your code. It is in the version you did not pin.",
  "Ship it, then write the test that proves it shipped.",
  "Today's deadline is tomorrow's backlog item.",
  "One does not simply fix a flaky test. One does not simply fix it twice.",
  "It compiles. That is not the same as it works.",
  "The most dangerous line of code is the one that looks obviously fine.",
  "You will open a pull request with 40 files. 39 of them are not yours.",
  "Somewhere, a developer is googling the error you just fixed.",
  "Delete it. You will not need it again. You will need it again.",
  "Names are hard. This is why we have conventions and also pain.",
  "The build is green. Treat this as a temporary condition.",
  "Technical debt is just debt you took on deliberately at a discount.",
  "Nothing ages faster than a plan written in a hurry.",
  "You have written this exact comment before, in a different repo, and it still did not help.",
];

export const SYSINFO = {
  id: [
    "uid=visitor(visitor) gid=visitor(visitor) groups=visitor(visitor)",
    "context=portfolio  security=optional  sandbox=strictly-not-a-container",
  ],
  uptime: [
    " 14:22:07 up 4 years, 187 days,  1 visitor",
    " 1 visitor, 0 processes that matter, load average: 0.00, 0.01, 0.05",
  ],
  env: [
    "USER=visitor",
    "SHELL=/bin/sh",
    "PWD=/home/rakesh",
    "THEME=blue-matrix",
    "BUDGET=unknown",
    "MOTIVATION=tbd",
    "EDITOR=vi",
    "HUMAN=true",
  ],
  unameShort: ["Terminal Portfolio 1.3.1 (shell-portfolio) x86_64"],
  unameAll: [
    "Terminal Portfolio 1.3.1 (shell-portfolio) x86_64",
    "React/18.2.0 TypeScript/5.0.4 styled-components/5.3.10",
    "Built with more care than this message implies.",
  ],
  psBare: ["    PID TTY          TIME CMD", "   1841 pts/0    00:00:04 node"],
  psAux: [
    "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
    "visitor   1841  0.4  1.9 142308 39204 pts/0    Sl   14:19   0:04 node",
    "visitor   1841  0.1  0.0      0     0 pts/0    Ss   14:19   0:00 idle",
    "visitor   1841  0.0  0.0      0     0 pts/0    R+  14:22   0:00 ps aux",
    "visitor   1841  0.0  0.0      0     0 ?        S    14:19   0:00 [whoami]",
  ],
  dfBare: ["usage: df [-h]"],
  dfH: [
    "Filesystem     Size  Used Avail Use% Mounted on",
    "/dev/portfolio  1.0P  482M  518M  48% /",
    "tmpfs          512M     0  512M   0% /tmp",
    "/dev/ram        16G  2.1G   14G  13% /dev/shm",
    "portfolio       4.0K  4.0K     0 100% /mnt/resume",
  ],
};

export const CLOSERS: string[] = [
  "there is no outside. this is the whole portfolio.",
  "you are already logged out. you logged in as a stranger.",
  "close the tab. that is the only exit that exists.",
];

export const COW = [
  "        \\   ^__^",
  "         \\  (oo)\\_______",
  "            (__)\\       )\\/\\",
  "                ||----w |",
  "                ||     ||",
];

export const COW_BORDER = { top: " ______", bottom: " ------" };
