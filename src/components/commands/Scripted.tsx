import { ScriptedMuted, ScriptedWrapper } from "../styles/Scripted.styled";

type Props = {
  lines: string[];
  muted?: string[];
};

/**
 * Renders canned terminal output verbatim. Both blocks rely on
 * `white-space: pre-wrap` so lines keep their layout.
 */
const Scripted: React.FC<Props> = ({ lines, muted = [] }) => (
  <ScriptedWrapper data-testid="scripted">
    <div>{lines.join("\n")}</div>
    {muted.length > 0 && <ScriptedMuted>{muted.join("\n")}</ScriptedMuted>}
  </ScriptedWrapper>
);

export default Scripted;
