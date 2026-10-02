import { readFileSync, writeFileSync } from "fs";
import { describe, it } from "vitest";
import { commands, publicCommands, EGG_ROSTER } from "../data/commands";
import { totalEggs } from "../utils/eggs";
import { MAN_NOTES } from "../data/manPages";

const synopsis = (cmd: string) => MAN_NOTES[cmd]?.synopsis ?? cmd;

const build = (): string => {
  {
    const documented = publicCommands.filter(({ cmd }) => MAN_NOTES[cmd]);
    const undocumented = publicCommands.filter(({ cmd }) => !MAN_NOTES[cmd]);
    const hidden = commands.filter(({ hidden: isHidden }) => isHidden);

    const takesArgs = (cmd: string) =>
      commands.find(({ cmd: name }) => name === cmd)?.acceptsArgs;

    const lines: string[] = [];

    lines.push("# Commands");
    lines.push("");
    lines.push(
      "Generated from `src/data/commands.ts`. Do not edit by hand, or fix the",
      "generator in `src/test/generateCommandsDoc.spec.tsx` and re-run it.",
      ""
    );

    lines.push(
      `${commands.length} commands: ${publicCommands.length} documented, ${hidden.length} hidden.`,
      ""
    );

    lines.push("## Documented commands");
    lines.push("");
    lines.push(
      "These are what `help` lists and what Tab autocomplete will reach."
    );
    lines.push("");
    lines.push("| Command | Description | Synopsis |");
    lines.push("| --- | --- | --- |");

    for (const { cmd, desc } of publicCommands) {
      lines.push(`| \`${cmd}\` | ${desc} | \`${synopsis(cmd)}\` |`);
    }

    lines.push("");

    if (undocumented.length > 0) {
      lines.push(
        "> Missing a man page: " +
          undocumented.map(({ cmd }) => `\`${cmd}\``).join(", ") +
          ". Add a note to `MAN_NOTES` in `src/data/manPages.ts`."
      );
      lines.push("");
    }

    lines.push("## Hidden commands");
    lines.push("");
    lines.push(
      "Not in `help`, not in Tab autocomplete, and refused by `man`. They exist",
      "to be typed at. Listed here for whoever is reading the source."
    );
    lines.push("");
    lines.push("| Command | Description | Args | Egg |");
    lines.push("| --- | --- | --- | --- |");

    for (const { cmd, desc, acceptsArgs, egg } of hidden) {
      lines.push(
        `| \`${cmd}\` | ${desc} | ${acceptsArgs ? "yes" : "no"} | ${
          egg ? `\`${egg}\`` : "-"
        } |`
      );
    }

    lines.push("");
    lines.push(
      `${totalEggs()} eggs total. An egg counts as discovered the first time its`,
      "component renders. Roster: " +
        EGG_ROSTER.map(id => `\`${id}\``).join(", ") +
        "."
    );
    lines.push("");

    lines.push("## Arguments");
    lines.push("");
    lines.push("| Command | Takes arguments |");
    lines.push("| --- | --- |");

    for (const { cmd } of commands) {
      lines.push(`| \`${cmd}\` | ${takesArgs(cmd) ? "yes" : "no"} |`);
    }

    lines.push("");
    lines.push(
      `\`man\` covers ${documented.length} of ${publicCommands.length} documented commands, and nothing else.`
    );
    lines.push("");

    return lines.join("\n");
  }
};

describe("docs/COMMANDS.md", () => {
  it("should be up to date with the registry", () => {
    // compare against what is committed, so adding a command without
    // regenerating fails here
    const committed = readFileSync("docs/COMMANDS.md", "utf-8");
    const built = build();

    expect(committed).toBe(built);
  });

  it("should regenerate an identical file", () => {
    const before = readFileSync("docs/COMMANDS.md", "utf-8");

    writeFileSync("docs/COMMANDS.md", build());

    expect(readFileSync("docs/COMMANDS.md", "utf-8")).toBe(before);
  });

  it("should list every command in the registry", () => {
    const doc = build();

    for (const { cmd } of commands) {
      expect(doc).toContain(`\`${cmd}\``);
    }
  });

  it("should not give a hidden command a man page", () => {
    // man reads MAN_NOTES at runtime, so an entry here would make it answer
    // for a hidden command and hand over the egg list
    const hidden = commands
      .filter(({ hidden: isHidden }) => isHidden)
      .map(({ cmd }) => cmd);

    for (const cmd of hidden) {
      expect(MAN_NOTES[cmd]).toBeUndefined();
    }
  });
});
