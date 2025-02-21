import { useDnD } from "../Workflow/DnDContext";
import AevatarItemMini from "./aevatarItemMini";

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: any
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sdk:w-[184px]  sdk:px-[30px] sdk:pt-[29px] sdk:flex sdk:flex-row sdk:gap-6 sdk:border-r-1 sdk:workflow-common-border">
      <div className="space-y-[80px]">
        <div>
          <p className="sdk:workflow-sidebar-title sdk:mb-[28px]">
            α-avatar type #1
          </p>
          <div className="flex flex-col space-y-4">
            <div>
              <AevatarItemMini
                name="new α-avatarα-avatarα-avatar"
                id={1}
                onDragStart={event => onDragStart(event, "default")}
                draggable
              ></AevatarItemMini>
            </div>

            <AevatarItemMini
              isnew={true}
              onDragStart={event => onDragStart(event, "new")}
              draggable
            ></AevatarItemMini>
          </div>
        </div>
        <div>
          <p className="sdk:workflow-sidebar-title sdk:mb-[28px]">
            α-avatar type #2
          </p>
          <div className="flex flex-col space-y-4">
            <AevatarItemMini
              name="new α-avatarα-avatarα-avatar"
              id={1}
            ></AevatarItemMini>
            <AevatarItemMini isnew={true}></AevatarItemMini>
          </div>
        </div>
      </div>
    </aside>
  );
}
