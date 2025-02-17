import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import CardLoading from "../CardLoading";
import AevatarCardInner from "./AevatarCardInner";
import "./index.css";
export interface IAevatarCardProps {
  loading?: boolean;
  agentInfo: IAgentInfoDetail;
}

export default function AevatarCard({ loading, agentInfo }: IAevatarCardProps) {
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
