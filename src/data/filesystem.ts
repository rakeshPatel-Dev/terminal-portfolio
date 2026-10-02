export type FsNode = {
  /** Directory entries, keyed by name. Absent on files. */
  children?: Record<string, FsNode>;
  /** File body. Absent on directories. */
  content?: string;
};

/**
 * A small read-only tree. Nothing here is a real file: the point is that
 * `ls`, `cat` and `grep` behave consistently against it, so the portfolio can
 * be navigated without ever pretending there is a server behind it.
 */
export const FS_ROOT: FsNode = {
  children: {
    home: {
      children: {
        rakesh: {
          children: {
            "about.txt": {
              content: [
                "Rakesh Patel",
                "",
                "Builds things that mostly work, and cares more about the parts",
                "nobody demos. Currently working on the gaps between a good",
                "idea and a thing that survives contact with a real user.",
              ].join("\n"),
            },
            "contact.txt": {
              content: [
                "email     rk5080976@gmail.com",
                "github    github.com/rakeshpatel-dev",
                "linkedin  linkedin.com/in/1o1rakesh/",
                "",
                "The email is real and gets read.",
              ].join("\n"),
            },
            projects: {
              children: {
                "snaphost.md": {
                  content: [
                    "# SnapHost",
                    "",
                    "File hosting for PDFs and images. Links expire, no account",
                    "needed, uploads are fast enough to feel instant.",
                    "",
                    "https://snaphost.dev/",
                  ].join("\n"),
                },
                "otrack.md": {
                  content: [
                    "# Otrack",
                    "",
                    "Order and delivery management for Ghardailo Dairy. Flexible",
                    "delivery schedules and the daily operations around them.",
                    "",
                    "https://otrack.vercel.app/",
                  ].join("\n"),
                },
                "ledg.md": {
                  content: [
                    "# Ledg",
                    "",
                    "Personal finance across multiple spaces. Expenses, income,",
                    "transfers, and the spending that follows them.",
                    "",
                    "https://ledg.rakeshpatel.me/",
                  ].join("\n"),
                },
                "ishirable.md": {
                  content: [
                    "# isHirable",
                    "",
                    "Reads a GitHub profile and says what is actually there:",
                    "repositories, contribution patterns, and the gaps worth",
                    "closing.",
                    "",
                    "https://ishirable.vercel.app/",
                  ].join("\n"),
                },
              },
            },
            notes: {
              children: {
                "todo.txt": {
                  content: [
                    "[x] ship the terminal",
                    "[x] hide something interesting",
                    "[ ] teach it to remember where you were",
                    "[ ] stop calling it a portfolio",
                  ].join("\n"),
                },
                "readme.txt": {
                  content: [
                    "There is a README somewhere. This is not it.",
                    "",
                    "Try: ls, then cd projects, then ls again.",
                  ].join("\n"),
                },
              },
            },
          },
        },
      },
    },
    etc: {
      children: {
        motd: {
          content: [
            "This terminal is a front end for a person. There is no backend.",
            "The eggs are findable but not listed. Good luck.",
          ].join("\n"),
        },
        hostname: { content: "shell\n" },
      },
    },
    "README.md": {
      content: [
        "# terminal-portfolio",
        "",
        "A resume you can poke at. Type `help` for the documented commands,",
        "which are not all of them.",
        "",
        "    ls              list the current directory",
        "    cd <dir>        move around",
        "    cat <file>      read a file",
        "    pwd             where you are",
        "",
        "The documented commands live here. The rest are findable.",
      ].join("\n"),
    },
  },
};

/** The directory every session starts in */
export const HOME = "/home/rakesh";

const normalize = (segments: string[]): string[] => {
  const out: string[] = [];

  for (const segment of segments) {
    if (!segment || segment === ".") continue;

    if (segment === "..") {
      out.pop();
      continue;
    }

    out.push(segment);
  }

  return out;
};

/**
 * Resolves a path against a directory. Handles absolute paths, `.` and `..`,
 * and stops at the first segment that is not a directory.
 */
export const resolvePath = (cwd: string, target: string): string => {
  // the segments have to be normalized together, otherwise a '..' in the
  // target normalizes to nothing instead of walking back through cwd
  const segments = target.startsWith("/")
    ? normalize(target.split("/"))
    : normalize([...cwd.split("/"), ...target.split("/")]);

  return `/${segments.join("/")}`;
};

/** Walks to a node, or undefined if any segment is missing */
export const nodeAt = (path: string): FsNode | undefined => {
  let node = FS_ROOT;

  for (const segment of path.split("/").filter(Boolean)) {
    const child = node.children?.[segment];

    if (!child) return undefined;

    node = child;
  }

  return node;
};

export const isDir = (node: FsNode | undefined): boolean =>
  Boolean(node?.children);

export const basename = (path: string): string =>
  path.split("/").filter(Boolean).pop() ?? "/";
