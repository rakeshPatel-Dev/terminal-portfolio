import { useContext } from "react";
import Scripted from "./Scripted";
import { termContext } from "../Terminal";

const PAYOFF_AT = 12;

const Xyzzy: React.FC = () => {
  const { history, index } = useContext(termContext);

  // Counted from history rather than storage, because every keystroke
  // regenerates the history keys and remounts this component. History is
  // newest first, so this entry plus everything after it.
  const visits = history
    .slice(index)
    .filter(cmd => cmd.trim().split(" ")[0] === "xyzzy").length;

  if (visits >= PAYOFF_AT) {
    return (
      <Scripted
        lines={["Something happened."]}
        muted={[
          "",
          `You needed ${PAYOFF_AT} tries. Most people give up by 3.`,
          "That is the nicest thing anyone has done on this site.",
        ]}
      />
    );
  }

  return (
    <Scripted
      lines={["Nothing happens."]}
      muted={
        visits > 1
          ? ["", `Nothing happened. Again. (that is ${visits})`]
          : ["", "That is correct. Very little here does."]
      }
    />
  );
};

export default Xyzzy;
