import { useMemo } from "react";
import _ from "lodash";
import Scripted from "./Scripted";
import { FORTUNES } from "../../data/easterEggs";

const Fortune: React.FC = () => {
  // once per mount, not per render
  const fortune = useMemo(() => _.sample(FORTUNES) ?? FORTUNES[0], []);

  return (
    <Scripted
      lines={[fortune]}
      muted={["", "  -- Anonymous, from the fortune database"]}
    />
  );
};

export default Fortune;
