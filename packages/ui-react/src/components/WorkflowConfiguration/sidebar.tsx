import { useDnD } from "../Workflow/DnDContext";
import AevatarItemMini from "./aevatarItemMini";
const list = ["α-avatar type #1", "α-avatar type #2", "α-avatar type #3"];
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
    <aside className="sdk:w-full sdk:sm:w-[184px] sdk:pl-[20px] sdk:pr-0 sdk:py-[16px] sdk:sm:px-[30px] sdk:sm:pt-[29px] sdk:flex sdk:flex-row sdk:sm:flex-col sdk:gap-6 sdk:border-r-1 sdk:workflow-common-border sdk:overflow-auto">
      {list.map(ele => (
        <div>
          <p className="sdk:workflow-sidebar-title sdk:mb-[28px]">{ele}</p>
          <div className="sdk:flex sdk:flex-row sdk:sm:flex-col sdk:space-x-4 sdk:sm:space-x-0 sdk:sm:space-y-4">
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
      ))}
    </aside>
  );
}
