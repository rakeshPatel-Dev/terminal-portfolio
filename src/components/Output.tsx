import { useContext, useEffect } from "react";
import { commands } from "../data/commands";
import { getRenderer } from "../data/renderers";
import { discover } from "../utils/eggs";
import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);

  const entry = commands.find(({ cmd: name }) => name === cmd);
  const handlesOwnArgs = entry?.acceptsArgs ?? false;

  // discovery is driven by the registry so a new egg gets tracked for free
  useEffect(() => {
    if (entry?.egg) discover(entry.egg);
  }, [entry?.egg]);

  // return 'Usage: <cmd>' if command arg is not valid
  // eg: about tt
  if (!handlesOwnArgs && arg.length > 0)
    return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;

  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {getRenderer(cmd)}
    </OutputContainer>
  );
};

export default Output;
