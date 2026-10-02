import { useContext } from "react";
import _ from "lodash";
import Scripted from "./Scripted";
import { CURL_RESPONSES } from "../../data/manPages";
import { termContext } from "../Terminal";

const BANNER = [
  "  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current",
  "                                 Dload  Upload   Total   Spent    Left  Speed",
];

const Curl: React.FC = () => {
  const { arg } = useContext(termContext);

  const target = _.trim(_.join(arg, " ")).replace(/^https?:\/\//, "");
  const key = target.split("/")[0];

  if (!target) {
    return (
      <Scripted
        lines={[
          "curl: try 'curl --help' or 'curl --manual' for more information",
        ]}
        muted={["", "Curl is a hidden command. There is no help for it."]}
      />
    );
  }

  const body = CURL_RESPONSES[key] ?? CURL_RESPONSES.default;
  const name = key || "shell.rakeshpatel.me";

  return (
    <Scripted
      lines={[`* Trying ${name}...`, ...BANNER, ...body]}
      muted={
        body === CURL_RESPONSES.default
          ? ["", "Nothing here links to anything real."]
          : undefined
      }
    />
  );
};

export default Curl;
