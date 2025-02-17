import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import CardLoading from "../CardLoading";
import AevatarCardInner from "./AevatarCardInner";
import "./index.css";
export interface IAevatarCardProps {
  loading?: boolean;
}

const agentInfo: IAgentInfoDetail = {
  id: "8c2baec4-3eca-4403-a113-b05942412770",
  agentType: "AI Basic",
  name: "Agent Name",
  properties: {
    modelProvider: "gpt",
    bio: "this is a lively and adorable physicist",
    topic: ["aelf.pdf", "Agent.pdf", "aelf.pdf", "Agent.pdf"],
  },
  grainId: "8c2baec4-3eca-4403-a113-b05942412770",
};
export default function AevatarCard({ loading }: IAevatarCardProps) {
  return (
    <div className="w-[234px] ">
      <div className="bg-[#141415] h-[288px] overflow-auto">
        {loading && <CardLoading />}
        {!loading && <AevatarCardInner {...agentInfo} />}
      </div>
      <div className="h-[14px] bg-[#141415] aevatarai-trapezoid-clip" />
    </div>
  );
}
