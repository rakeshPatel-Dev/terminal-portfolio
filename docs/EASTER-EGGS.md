# Easter Eggs

A plan for hidden commands, fake system utilities, and global visual effects.

## Status

**Everything below is a plan except where marked shipped.** The command tables in Phase 1
through Phase 4 describe what could be built, not what exists. If you type one and get
`command not found`, that is expected.

| Item | Status |
| --- | --- |
| Phase 0.1 command registry | Shipped |
| Phase 0.2 table-driven `argTab` | Shipped |
| Phase 0.3 egg discovery tracker | Shipped |
| Phase 0.7 test isolation | Shipped |
| Phase 0.4 effects layer | Not started, needs Phase 3 |
| Phase 0.5 `useTypewriter` | Not started, needs Phase 3 |
| Phase 0.6 reduced-motion guard | Not started, needs Phase 3 |
| Phase 0.8 multi-word commands | Shipped |
| `sudo` | Shipped |
| `rm -rf /` | Shipped |
| `hello world` | Shipped |
| System utilities (`id`, `env`, `uptime`, `uname`, `ps`, `df`) | Shipped |
| `fortune`, `cowsay`, `exit`, `quit`, `xyzzy` | Shipped |
| `man`, `curl`, `git log` | Shipped |
| Filesystem (`ls`, `cd`, `cat`, `pwd`) | Shipped |
| `ping` | Not started |
| Everything else | Not started |

Every command and its description is listed in [COMMANDS.md](COMMANDS.md),
generated from the registry by `npm run doc`.

## Why

The terminal is the whole point of this site. `help` shows the polite version; everything
else is what a curious visitor types when nobody is watching. Easter eggs are the highest
leverage thing on the site — they cost almost nothing in performance, they are the thing
visitors screenshot and send to friends, and they signal "the person who built this is
fun" more directly than another paragraph of bio text.

Constraint for the whole plan: **no new runtime dependencies.** The dependency list is
react, styled-components, and lodash, and the README advertises the Lighthouse score. A PWA
that ships a 70kb animation library to make rain fall has made the wrong trade. All motion
is CSS keyframes in styled-components.

## Architecture constraints

Discovered by reading the code. These shape every decision below.

| Constraint | Location | Consequence |
| --- | --- | --- |
| The `commands` array is the only gate. Anything absent renders `command not found`. | `src/components/Terminal.tsx` | Every egg must be registered here or it does not exist |
| `Help` iterates `commands` directly | `src/components/commands/Help.tsx` | Adding an egg to that array leaks it into `help` and kills the surprise |
| Tab autocomplete iterates `commands` directly | `src/components/Terminal.tsx` | Same leak, in the hint dropdown |
| `Output` is a hardcoded cmd to JSX map | `src/components/Output.tsx` | Adding a command is currently four edits across four files |
| `specialCmds` whitelist rejects args | `src/components/Output.tsx` | Arg-taking commands must be added or they render `Usage: cmd` |
| `argTab` is a 7-branch if/else chain | `src/utils/funcs.ts` | Will not survive 20 subcommand commands |
| ASCII art convention: `?raw` text files or inline template literals | `ascii-art-rakesh.txt`, `src/components/commands/Welcome.tsx` | Follow it, do not invent a third style |
| No `localStorage` cleanup between tests | `src/test/setup.ts` | Discovery state will leak across the existing 77 tests |
| Pre-commit runs the full suite plus lint-staged | `.husky` | Every commit is gated |

## Phase 0 — Foundation

Blocks everything else. Ship as its own PR.

### 0.1 Single command registry

New `src/data/commands.ts`. One source of truth for command metadata, the renderer map,
and autocomplete data.

```ts
export type Command = {
  cmd: string;
  desc: string;
  tab: number;
  hidden?: boolean;  // excluded from `help` and from Tab autocomplete
  egg?: string;      // discovery id; absent means not an easter egg
  subcommands?: string[][]; // [literal, ...completions] for table-driven argTab
};
```

- `Help` filters on `hidden`
- The autocomplete path filters on `hidden`
- The registry exports `renderers: Record<string, ReactNode>` so `Output` stops being a
  hardcoded object literal

Result: adding a command becomes one entry in one file, not four edits in four files.

### 0.2 Table-driven autocomplete

Rewrite `argTab` to consume `subcommands` instead of hardcoded branches. `themes set`,
`projects go`, `socials go` and all future subcommands fall out of data.

### 0.3 Discovery tracker

New `src/utils/eggs.ts`: `discover(id)`, `found()`, `total()`, persisted under `tsn-eggs`.
Eggs call `discover` when they fire. Powers the `hint` command and the completion reward in
Phase 4.

### 0.4 Effects layer

New `src/components/effects/` plus an `effectsContext` next to `themeContext` in
`src/App.tsx`. A single fixed, `pointer-events: none` overlay rendered once above the
terminal. Effects register and unregister by id so `matrix` can toggle and `rm -rf /` can
run a timed sequence without fighting React state.

### 0.5 `useTypewriter`

Typing effect for boot sequences and progressive output. CSS and styled-components only.

### 0.6 Reduced-motion guard

`prefers-reduced-motion: reduce` disables rain, shake, and glitch. jsdom does not implement
`matchMedia`, so add a guard in `src/test/setup.ts`.

### 0.7 Test hygiene

No `localStorage` cleanup exists today. Add it to `src/test/setup.ts` before writing egg
number one.

### 0.8 Multi-word commands

The terminal resolves a command from the first whitespace-delimited token only, so anything
that is really a phrase can never match:

| Typed | Resolved as | Result |
| --- | --- | --- |
| `rm -rf /` | `rm` | command not found |
| `hello world` | `hello` | command not found |
| `sudo hire me` | `sudo` | `Usage: sudo` |

Add an optional `match` field so an entry can claim the whole line:

```ts
export type Command = {
  cmd: string;
  desc: string;
  tab: number;
  match?: string;
  hidden?: boolean;
  egg?: string;
};
```

Two entries then look like `cmd: "rm", match: "rm -rf /", egg: "rm-rf"` and
`cmd: "hello", match: "hello world", egg: "hello-world"`.

Resolution order in `Terminal.tsx` becomes an exact `match` on the trimmed line first, then
fall back to the first-token lookup. `match` entries need `acceptsArgs: true` when the tail
of the phrase varies, eg `cowsay <anything>`.

This is a prerequisite for roughly two thirds of Phase 1, which is why it belongs in the
foundation rather than being discovered mid-implementation.

## Phase 1 — Cheap, high delight

Pure static output, no new infrastructure. Best delight per hour in the plan. All art
follows the existing `?raw` / template-literal convention.

| Command | Idea |
| --- | --- |
| `sudo` | `visitor is not in the sudoers file. Incident #4471 reported.` Incident number increments per visit |
| `sudo hire me` | The one that actually does something |
| `rm -rf /` | Red alert banner. Phase 3 adds shake and countdown |
| `fortune` | Curated dev fortunes. Unix classic, thematically perfect |
| `cowsay <text>` | The cow, wrapped correctly |
| `ls` | `did you mean sl?` then `sl` renders a steam locomotive |
| `xyzzy` | `nothing happens.` Thirty visits later, something does |
| `hello world` | Obligatory |
| `exit` / `quit` | `there is no outside. this is the whole portfolio.` |
| `id`, `uname -a`, `uptime`, `ps aux`, `df -h`, `env` | Fake sysinfo, quietly self-referential. `ps aux` lists the site's own components |
| `banner <text>` | ASCII text from a hand-rolled 5x5 font. No figlet dependency |
| `hint` | Progressive hint, unlocks after two discoveries |

## Phase 2 — Stateful and interactive

- **Fake filesystem.** `ls`, `cd`, `cat`, `grep` against an in-memory tree —
  `/home/rakesh/projects`, `/etc/passwd`, `/var/log/last_boot`. Realistic errors for missing
  paths. `cat .bash_history` hides something. Biggest single "wow, they built this" item.
- **`man <cmd>`** — real man pages for each command.
- **`ping`** — animated, then 100% packet loss.
- **`curl <url>`** — progress bar, then output.
- **`git log`** — a fake commit history that is actually funny.
- **`sudo rm -rf /var/log`** — purge animation, then `logs restored. nothing to see here.`
- **`guess`** — number guessing with hints.
- **Type your own name.** `rakesh` prints a bio; typing the visitor's own name gets
  `nice try. you're a visitor.` Recruiters screenshot this.

## Phase 3 — Visual effects

Needs 0.4.

- `matrix` — canvas rain tinted to `theme.colors.primary`, not hardcoded green.
- Konami code — unlocks a hidden seventh theme, persisted so it survives reload.
- `rm -rf /` full sequence — shake, red flash, countdown, `just kidding`.
- `reboot` — boot sequence typing animation.
- `glitch` — CRT scanline toggle.

## Phase 4 — Meta and retention

- `about` reports `eggs found: 7/23`.
- All 23 found — confetti, unlock `resume`, reveal a hidden message.
- `contact` / `guestbook`.

## Sequencing and risk

1. **Phase 0.1 and 0.2** — standalone commit. This is the highest-risk change in the plan
   because it rewrites the autocompleter that 77 existing tests cover. Keep it revertable.
2. **Phase 1** — one PR, roughly twelve commands, low risk, high payoff.
3. **Phase 2** — the filesystem gets its own PR. It is the most code and the most surface
   area for edge cases.
4. **Phase 3** — last. The only phase that can regress Lighthouse or mobile performance.

## Testing strategy

- One test per command in `src/test/Terminal.spec.tsx`, following the existing pattern.
- Discovery assertions go through the `eggs` module, not localStorage directly.
- jsdom has no canvas. Guard `matrix` behind a mocked context so the effect layer is
  testable without a real 2D context.
- Reset discovery state in `beforeEach` or Phase 1 tests will fail in a confusing order-
  dependent way.
