import { useContext, useEffect } from "react";
import { SudoError, SudoHint, SudoWrapper } from "../styles/Sudo.styled";
import { discover } from "../../utils/eggs";
import { termContext } from "../Terminal";

const Sudo: React.FC = () => {
  const { history, index } = useContext(termContext);

  useEffect(() => {
    discover("sudo");
  }, []);

  // Derived from history rather than component state, because every keystroke
  // regenerates the history keys and remounts this component
  const attempts = history
    .slice(0, index + 1)
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
