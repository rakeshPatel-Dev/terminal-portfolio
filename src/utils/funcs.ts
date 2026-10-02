import _ from "lodash";
import { commands } from "../data/commands";

/**
 * Generates html tabs
 * @param {number} num - The number of tabs
 * @returns {string} tabs - Tab string
 */
export const generateTabs = (num = 0): string => {
  let tabs = "\xA0\xA0";
  for (let i = 0; i < num; i++) {
    tabs += "\xA0";
  }
  return tabs;
};

/**
 * Check arg is valid
 * @param {string[]} arg - The arg array
 * @param {string} action - The action to compare | "go" | "set"
 * @param {string[]} options - Option array to compare | "dark" | "1"
 * @returns {boolean} boolean
 */
export const isArgInvalid = (
  arg: string[],
  action: string,
  options: string[]
) => arg[0] !== action || !_.includes(options, arg[1]) || arg.length > 2;

/**
 * Transform current cmd & arg into array
 * then return back the array
 * @param {string[]} history - The history array
 * @returns {string[]} array of cmd string
 */
export const getCurrentCmdArry = (history: string[]) =>
  _.split(history[0].trim(), " ");

/**
 * Check current render makes redirect
 * @param {boolean} rerender - is submitted or not
 * @param {string[]} currentCommand - current submitted command
 * @param {string} command - the command of the function
 * @returns {boolean} redirect - true | false
 */
export const checkRedirect = (
  rerender: boolean,
  currentCommand: string[],
  command: string
): boolean =>
  rerender && // is submitted
  currentCommand[0] === command && // current command starts with ('socials'|'projects')
  currentCommand[1] === "go" && // first arg is 'go'
  currentCommand.length > 1 && // current command has arg
  currentCommand.length < 4 && // if num of arg is valid (not `projects go 1 sth`)
  _.includes([1, 2, 3, 4], parseInt(currentCommand[2])); // arg last part is one of id

/**
 * Check current render makes redirect for theme
 * @param {boolean} rerender - is submitted or not
 * @param {string[]} currentCommand - current submitted command
 * @param {string[]} themes - the command of the function
 * @returns {boolean} redirect - true | false
 */
export const checkThemeSwitch = (
  rerender: boolean,
  currentCommand: string[],
  themes: string[]
): boolean =>
  rerender && // is submitted
  currentCommand[0] === "themes" && // current command starts with 'themes'
  currentCommand[1] === "set" && // first arg is 'set'
  currentCommand.length > 1 && // current command has arg
  currentCommand.length < 4 && // if num of arg is valid (not `themes set light sth`)
  _.includes(themes, currentCommand[2]); // arg last part is one of id

/**
 * Perform advanced tab actions, driven by the `subcommands` table on each
 * command. Walks the declared steps to work out which one the caret is on:
 * a `literal` step gets completed in place, a `values` step offers matches.
 * @param {string} inputVal - current input value
 * @param {(value: React.SetStateAction<string>) => void} setInputVal - setInputVal setState
 * @returns {string[] | undefined} hints to merge, or undefined if nothing to do
 */
export const argTab = (
  inputVal: string,
  setInputVal: (value: React.SetStateAction<string>) => void
): string[] | undefined => {
  const parts = inputVal.split(" ");
  const entry = commands.find(({ cmd }) => cmd === parts[0]);
  const steps = entry?.subcommands;

  if (!steps) return;

  const consumed = [parts[0]];

  for (let i = 0; i < steps.length; i++) {
    const { literal, values } = steps[i];
    const partial = parts[i + 1];

    // nothing typed past the final step
    if (partial === undefined) return;

    if (literal) {
      // this step is fully typed, carry on to the next one
      if (partial === literal) {
        consumed.push(partial);
        continue;
      }

      // partway through the keyword, eg `themes s`
      if (literal.startsWith(partial)) {
        setInputVal(`${consumed.join(" ")} ${literal}`);
        return [];
      }

      return;
    }

    // free choice step, eg the theme names after `themes set`
    const options = values ? values() : [];
    return partial === ""
      ? options
      : options.filter(option => option.startsWith(partial));
  }
};
