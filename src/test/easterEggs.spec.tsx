import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, userEvent } from "../utils/test-utils";
import Terminal from "../components/Terminal";
import { CLOSERS, COW, FORTUNES, SYSINFO } from "../data/easterEggs";

function setup() {
  const user = userEvent.setup();
  render(<Terminal />);
  const input: HTMLInputElement = screen.getByTitle("terminal-input");
  return { user, input };
}

/**
 * The command history renders newest first, so the first scripted block in the
 * DOM is the output of the most recent command.
 */
const latestBlock = (): HTMLElement => screen.getAllByTestId("scripted")[0];

const latestText = (): string => latestBlock().textContent ?? "";

const latestLines = (): string[] =>
  Array.from(latestBlock().children).flatMap(node =>
    (node.textContent ?? "").split("\n")
  );

describe("Easter egg content", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let input: HTMLInputElement;

  beforeEach(() => {
    ({ user, input } = setup());
  });

  describe("fortune", () => {
    it("should print a fortune from the database", async () => {
      await user.type(input, "fortune{enter}");
      expect(FORTUNES).toContain(latestLines()[0]);
    });

    it("should credit the database", async () => {
      await user.type(input, "fortune{enter}");
      expect(latestText()).toContain("fortune database");
    });
  });

  describe("cowsay", () => {
    it("should speak the argument", async () => {
      await user.type(input, "cowsay apple{enter}");

      const lines = latestLines();
      expect(lines[1]).toBe("< apple >");
      expect(lines[0].startsWith(" _")).toBe(true);
      expect(lines[0].length).toBe(lines[2].length);
      expect(lines.slice(3)).toEqual(COW);
    });

    it("should moo when given nothing", async () => {
      await user.type(input, "cowsay{enter}");
      expect(latestLines()[1]).toBe("< moo >");
    });

    it("should strip surrounding quotes like echo does", async () => {
      await user.type(input, `cowsay 'hello there'{enter}`);
      expect(latestLines()[1]).toBe("< hello there >");
    });

    it("should keep every line the same width when text wraps", async () => {
      await user.type(
        input,
        "cowsay the quick brown fox jumps over the lazy dog{enter}"
      );

      const lines = latestLines();
      const speech = lines.filter(line => line.startsWith("< "));

      expect(speech.length).toBeGreaterThan(1);
      speech.forEach(line => expect(line.length).toBe(speech[0].length));
    });
  });

  describe("fake system utilities", () => {
    it("should print an id for the visitor", async () => {
      await user.type(input, "id{enter}");
      expect(latestLines()).toEqual([...SYSINFO.id]);
    });

    it("should print environment variables", async () => {
      await user.type(input, "env{enter}");
      expect(latestLines()).toEqual([...SYSINFO.env]);
    });

    it("should print a long uptime with a bare command", async () => {
      await user.type(input, "uptime{enter}");
      expect(latestLines()).toEqual([...SYSINFO.uptime]);
    });

    it("should show more from uname with -a", async () => {
      await user.type(input, "uname{enter}");
      expect(latestLines()).toEqual([...SYSINFO.unameShort]);

      await user.type(input, "uname -a{enter}");
      expect(latestLines()).toEqual([...SYSINFO.unameAll]);
      expect(latestLines().length).toBeGreaterThan(SYSINFO.unameShort.length);
    });

    it("should show one process bare and the whole table for aux", async () => {
      await user.type(input, "ps{enter}");
      expect(latestLines()).toEqual([...SYSINFO.psBare]);

      await user.type(input, "ps aux{enter}");
      expect(latestLines()).toEqual([...SYSINFO.psAux]);
    });

    it("should show usage for bare df and the table for -h", async () => {
      await user.type(input, "df{enter}");
      expect(latestLines()).toEqual([...SYSINFO.dfBare]);

      await user.type(input, "df -h{enter}");
      expect(latestLines()).toEqual([...SYSINFO.dfH]);
    });
  });

  describe("exit and quit", () => {
    it("should give different closers", async () => {
      await user.type(input, "exit{enter}");
      const exited = latestLines();

      await user.type(input, "quit{enter}");
      const quit = latestLines();

      expect(exited).toEqual([CLOSERS[0]]);
      expect(quit).toEqual([CLOSERS[1]]);
    });
  });

  describe("xyzzy", () => {
    it("should do nothing at first", async () => {
      await user.type(input, "xyzzy{enter}");

      expect(latestLines()[0]).toBe("Nothing happens.");
      expect(latestText()).not.toContain("Again");
    });

    it("should note the repeat without changing the outcome", async () => {
      await user.type(input, "xyzzy{enter}");
      await user.type(input, "xyzzy{enter}");

      expect(latestLines()[0]).toBe("Nothing happens.");
      expect(latestText()).toContain("that is 2");
    });

    it("should finally pay off on the twelfth attempt", async () => {
      for (let attempt = 0; attempt < 12; attempt++) {
        await user.type(input, "xyzzy{enter}");
      }

      expect(latestLines()[0]).toBe("Something happened.");
    });
  });

  describe("man", () => {
    it("should document a public command", async () => {
      await user.type(input, "man about{enter}");

      const lines = latestLines();
      expect(lines).toContain("ABOUT(1)");
      expect(lines.some(line => line.includes("about -"))).toBe(true);
    });

    it("should refuse unknown commands", async () => {
      await user.type(input, "man nonsense{enter}");
      expect(latestText()).toContain("No manual entry for nonsense.");
    });

    it("should not leak the hidden commands", async () => {
      await user.type(input, "man xyzzy{enter}");
      await user.type(input, "man fortune{enter}");

      expect(
        screen
          .getAllByTestId("scripted")
          .map(b => b.textContent)
          .join(" ")
      ).not.toContain("NAME");
    });

    it("should say so when given no argument", async () => {
      await user.type(input, "man{enter}");
      expect(latestText()).toContain("What manual page do you want?");
    });
  });

  describe("curl", () => {
    it("should refuse to run with no target", async () => {
      await user.type(input, "curl{enter}");
      expect(latestText()).toContain("curl --help");
    });

    it("should report a progress bar and a response", async () => {
      await user.type(input, "curl portfolio{enter}");

      expect(latestText()).toContain("100");
      expect(latestText()).toContain("worse");
    });

    it("should fall back for an unknown host", async () => {
      await user.type(input, "curl example.com{enter}");
      expect(latestText()).toContain("rss");
    });
  });

  describe("git log", () => {
    it("should print the commit history", async () => {
      await user.type(input, "git log{enter}");

      expect(latestText()).toContain("stop trying to make fetch happen");
      expect(latestText()).toContain("rk5080976@gmail.com");
    });
  });
  describe("filesystem", () => {
    it("should start in the home directory", async () => {
      await user.type(input, "ls{enter}");
      expect(latestText()).toContain("about.txt");
      expect(latestText()).toContain("projects");
    });

    it("should follow cd and report the new directory", async () => {
      await user.type(input, "cd projects{enter}");
      await user.type(input, "pwd{enter}");

      expect(latestText()).toContain("/home/rakesh/projects");
    });

    it("should stay where cd left the visitor", async () => {
      await user.type(input, "cd projects{enter}");
      await user.type(input, "ls{enter}");

      expect(latestText()).toContain("snaphost.md");
      expect(latestText()).not.toContain("about.txt");
    });

    it("should return home with cd ..", async () => {
      await user.type(input, "cd projects{enter}");
      await user.type(input, "cd ..{enter}");
      await user.type(input, "pwd{enter}");

      expect(latestText()).toContain("/home/rakesh");
      expect(latestText()).not.toContain("projects");
    });

    it("should refuse to leave the tree", async () => {
      await user.type(input, "cd nowhere{enter}");
      expect(latestText()).toContain("No such file or directory");
    });

    it("should read a file with cat", async () => {
      await user.type(input, "cat contact.txt{enter}");
      expect(latestText()).toContain("rk5080976@gmail.com");
    });

    it("should refuse to cat a directory", async () => {
      await user.type(input, "cat projects{enter}");
      expect(latestText()).toContain("Is a directory");
    });

    it("should say so for a missing file", async () => {
      await user.type(input, "cat ghost.txt{enter}");
      expect(latestText()).toContain("No such file or directory");
    });

    it("should resolve a relative path", async () => {
      await user.type(input, "cd projects{enter}");
      await user.type(input, "cat ../notes/todo.txt{enter}");
      expect(latestText()).toContain("stop calling it a portfolio");
    });

    it("should give each entry the directory it was run in", async () => {
      await user.type(input, "ls{enter}");
      await user.type(input, "cd projects{enter}");
      await user.type(input, "ls{enter}");

      const listings = screen
        .getAllByTestId("scripted")
        .map(block => block.textContent ?? "");

      expect(listings[0]).toContain("snaphost.md");
      expect(listings[1]).toContain("about.txt");
    });
  });
});
