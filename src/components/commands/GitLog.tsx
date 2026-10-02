import Scripted from "./Scripted";
import { GIT_LOG } from "../../data/manPages";

const GitLog: React.FC = () => <Scripted lines={GIT_LOG} />;

export default GitLog;
