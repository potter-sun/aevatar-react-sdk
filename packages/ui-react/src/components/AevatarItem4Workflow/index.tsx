import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import AevatarCardInner from "./AevatarCardInner";
import { Handle, Position } from "@xyflow/react";

interface IProps {
  data: any;
}
const agentInfo: IAgentInfoDetail = {
  id: "8c2baec4-3eca-4403-a113-b05942412770",
  agentType: "AI Basic",
  name: "Agent Name",
  properties: {
    modelProvider: "gpt",
    bio: "this is a lively and adorable physicist",
    topic: ["aelf.pdf", "Agent1.pdf", "aelf1.pdf", "Agent.pdf"],
  },
  grainId: "8c2baec4-3eca-4403-a113-b05942412770",
};
export default function AevatarItem({ data }: IProps) {
  const { isNew } = data;
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <AevatarCardInner {...agentInfo} isNew={isNew}></AevatarCardInner>
      <Handle type="source" position={Position.Right} id="b" />
    </>
  );
}
