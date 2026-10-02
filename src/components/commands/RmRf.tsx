import { useContext } from "react";
import { RmError, RmRelief, RmWrapper } from "../styles/RmRf.styled";
import { termContext } from "../Terminal";

const RmRf: React.FC = () => {
  const { history, index } = useContext(termContext);

  const attempts = history
    .slice(0, index + 1)
    .filter(cmd => cmd.trim() === "rm -rf /").length;

  return (
    <RmWrapper data-testid="rm-rf">
      <div>
        rm: descending into / <RmError>Permission denied</RmError>
      </div>
      <div>
        rm: cannot remove &#39;/&#39;:{" "}
        <RmError>Device or resource busy</RmError>
      </div>
      <RmRelief>
        {attempts > 1
          ? "Still nothing deleted. You have tried this twice now."
          : "Nothing was deleted. It is a static website, there was never anything to delete."}
      </RmRelief>
    </RmWrapper>
  );
};

export default RmRf;
