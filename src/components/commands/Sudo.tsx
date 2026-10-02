import { useContext } from "react";
import { SudoError, SudoHint, SudoWrapper } from "../styles/Sudo.styled";
import { termContext } from "../Terminal";

const Sudo: React.FC = () => {
  const { history, index } = useContext(termContext);

  // Counted from history rather than component state, because every
  // keystroke regenerates the history keys and remounts this component.
  // History is newest first, so this entry plus everything after it.
  const attempts = history
    .slice(index)
    .filter(cmd => cmd.trim().split(" ")[0] === "sudo").length;

  return (
    <SudoWrapper data-testid="sudo">
      <div>
        Sorry, user visitor is not in the sudoers file.{" "}
        <SudoError>This incident will be reported.</SudoError>
      </div>
      {attempts > 1 ? (
        <SudoHint>
          That is {attempts} incidents now. Nothing down here needs root.
        </SudoHint>
      ) : (
        <SudoHint>
          Nothing here needs root. Try <code>help</code> instead.
        </SudoHint>
      )}
    </SudoWrapper>
  );
};

export default Sudo;
