import { User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";

const TermInfo = () => {
  return (
    <Wrapper>
      <User>visitor</User>@<WebsiteName>shell.rakeshpatel.me</WebsiteName>:~$
    </Wrapper>
  );
};

export default TermInfo;
