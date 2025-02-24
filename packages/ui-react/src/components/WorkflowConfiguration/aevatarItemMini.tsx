import "./index.css";
import AevatarItemIcon from "../../assets/svg/aevatarItem.svg?react";
import AevatarItemHoverIcon from "../../assets/svg/aevatarItem-hover.svg?react";
import NewAevatarItemIcon from "../../assets/svg/new-aevatarItem.svg?react";
import NewAevatarItemHoverIcon from "../../assets/svg/new-aevatarItem-hover.svg?react";

interface IProps {
  isnew?: boolean;
  id?: string | number;
  name?: string;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
}
export default function AevatarItem(props: IProps) {
  const { isnew, id, name, onDragStart, draggable } = props;
  return (
    <div
      className="sdk:relative sdk:w-[124px] sdk:h-[45px] sdk:cursor-pointer group"
      onDragStart={onDragStart}
      draggable={draggable}
    >
      {isnew ? (
        <>
          <NewAevatarItemIcon className="sdk:absolute group-hover:hidden"></NewAevatarItemIcon>
          <NewAevatarItemHoverIcon className="sdk:absolute group-hover:block hidden"></NewAevatarItemHoverIcon>
          <div className="sdk:px-[17px] sdk:pt-[16px] sdk:pb-[15px] sdk:relative sdk:flex ">
            <p className="sdk:workflow-new-aevatar-item">new g-aevatar</p>
          </div>
        </>
      ) : (
        <>
          <AevatarItemIcon className="sdk:absolute group-hover:hidden"></AevatarItemIcon>
          <AevatarItemHoverIcon className="sdk:absolute group-hover:block hidden"></AevatarItemHoverIcon>
          <div className="sdk:px-[15px] sdk:py-[7px] sdk:relative sdk:flex sdk:flex-col ">
            <p className="sdk:workflow-aevatar-item-name truncate">{name}</p>
            <p className="sdk:workflow-aevatar-item-id">id: {id}</p>
          </div>
        </>
      )}
    </div>
  );
}
