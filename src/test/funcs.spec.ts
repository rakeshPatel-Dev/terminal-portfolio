import { describe, it, expect, vi } from "vitest";
import { argTab } from "../utils/funcs";
import theme from "../components/styles/themes";

const themeNames = Object.keys(theme);

describe("argTab", () => {
  let setInputVal: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setInputVal = vi.fn();
  });

  describe("literal steps", () => {
    it("should complete a bare command to its first keyword", () => {
      expect(argTab("themes ", setInputVal)).toEqual([]);
      expect(setInputVal).toHaveBeenCalledWith("themes set");
    });

    it("should complete a partial keyword", () => {
      expect(argTab("themes s", setInputVal)).toEqual([]);
      expect(setInputVal).toHaveBeenCalledWith("themes set");
    });

    it("should complete 'projects' and 'socials' to 'go'", () => {
      argTab("projects ", setInputVal);
      expect(setInputVal).toHaveBeenCalledWith("projects go");

      argTab("socials g", setInputVal);
      expect(setInputVal).toHaveBeenCalledWith("socials go");
    });

    it("should do nothing once the keyword is fully typed", () => {
      expect(argTab("themes set", setInputVal)).toBeUndefined();
      expect(setInputVal).not.toHaveBeenCalled();
    });

    it("should not complete a keyword the user is not typing", () => {
      expect(argTab("themes x", setInputVal)).toBeUndefined();
      expect(setInputVal).not.toHaveBeenCalled();
    });
  });

  describe("value steps", () => {
    it("should offer every theme after 'themes set '", () => {
      expect(argTab("themes set ", setInputVal)).toEqual(themeNames);
    });

    it("should narrow themes by prefix", () => {
      expect(argTab("themes set e", setInputVal)).toEqual(["espresso"]);
    });

    it("should return nothing for a prefix that matches no theme", () => {
      expect(argTab("themes set zz", setInputVal)).toEqual([]);
    });

    it("should offer projects after 'projects go '", () => {
      const hints = argTab("projects go ", setInputVal);
      expect(hints).toHaveLength(4);
      expect(hints).toContain("1.SnapHost");
      expect(hints).toContain("4.isHirable");
    });

    it("should offer socials after 'socials go '", () => {
      const hints = argTab("socials go ", setInputVal);
      expect(hints).toHaveLength(4);
      expect(hints).toContain("1.GitHub");
      expect(hints).toContain("4.Instagram");
    });
  });

  describe("no subcommands", () => {
    it("should do nothing for a command with no subcommand table", () => {
      expect(argTab("about ", setInputVal)).toBeUndefined();
      expect(setInputVal).not.toHaveBeenCalled();
    });

    it("should do nothing for an unknown command", () => {
      expect(argTab("sudo ", setInputVal)).toBeUndefined();
      expect(setInputVal).not.toHaveBeenCalled();
    });
  });
});
