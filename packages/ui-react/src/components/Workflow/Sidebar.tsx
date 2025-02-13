import React from "react";
import { useDnD } from "./DnDContext";

type NodeType = "input" | "default" | "output";

const Avatar = ({ onDragStart, name, id }: any) => {
  return (
    <div
      className="flex items-center p-4 sdk:bg-black sdk:text-white"
      onDragStart={onDragStart}
      draggable
    >
      <div className="flex flex-col">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm ">ID: {id}</p>
      </div>
    </div>
  );
};
const Sidebar: React.FC = () => {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const avatarData = {
    name: "eevatar name",
    id: 2,
    onDragStart: event => onDragStart(event, "default"),
  };
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <Avatar {...avatarData} />
    </aside>
  );
};

export default Sidebar;
