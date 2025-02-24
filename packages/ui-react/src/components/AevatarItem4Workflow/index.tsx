import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import AevatarCardInner from "./AevatarCardInner";
import { Handle, Position } from "@xyflow/react";

interface IProps {
  id: string;
  data: any;
  onClick?: (data: any) => void;
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
  agentGuid: ""
};
export default function AevatarItem({ id: nodeId, data }: IProps) {
  const { isNew, onClick, deleteNode } = data;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#53FF8A",
          width: 10,
          height: 10,
        }}
      />
      <AevatarCardInner
        {...agentInfo}
        isNew={isNew}
        onClick={onClick}
        deleteNode={deleteNode}
        nodeId={nodeId}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{
          background: "#53FF8A",
          width: 10,
          height: 10,
        }}
      />
    </>
  );
}
