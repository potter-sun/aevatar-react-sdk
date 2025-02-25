import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import CardLoading from "../CardLoading";
import AevatarCardInner from "./AevatarCardInner";
import "./index.css";

export interface IAevatarCardProps {
  loading?: boolean;
  agentInfo: IAgentInfoDetail;
  onEditGaevatar: (id: string) => void;
}

export default function AevatarCard({
  loading,
  agentInfo,
  onEditGaevatar,
}: IAevatarCardProps) {
  return (
    <div className="sdk:w-[234px] ">
      <div className="sdk:bg-[#141415] sdk:h-[288px] sdk:overflow-auto">
        {loading && <CardLoading />}
        {!loading && (
          <AevatarCardInner {...agentInfo} onEditGaevatar={onEditGaevatar} />
        )}
      </div>
      <div className="sdk:h-[14px] sdk:bg-[#141415] aevatarai-trapezoid-clip" />
    </div>
  );
}
