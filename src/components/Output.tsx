import { useContext } from "react";
import { argCommands } from "../data/commands";
import { getRenderer } from "../data/renderers";
import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);

  const handlesOwnArgs = argCommands.some(({ cmd: c }) => c === cmd);

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
