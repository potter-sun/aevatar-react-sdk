import "./index.css";
import AevatarItemIcon from "../../assets/svg/aevatarItem.svg?react";
import AevatarItemHoverIcon from "../../assets/svg/aevatarItem-hover.svg?react";
import NewAevatarItemIcon from "../../assets/svg/new-aevatarItem.svg?react";
import NewAevatarItemHoverIcon from "../../assets/svg/new-aevatarItem-hover.svg?react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface IProps {
  isnew?: boolean;
  agentType?: string;
  disabled?: boolean;
  name?: string;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
}
export default function AevatarItem(props: IProps) {
  const { isnew, agentType, name, onDragStart, draggable, disabled } = props;
  return (
    <div
      className={clsx(
        "sdk:relative sdk:w-[124px] sdk:h-[45px] sdk:cursor-pointer sdk:group",
        disabled && "sdk:cursor-not-allowed!"
      )}
      onDragStart={onDragStart}
      draggable={disabled ? false : draggable}>
      {isnew ? (
        <>
          <NewAevatarItemIcon
            className={clsx(
              "sdk:absolute sdk:group-hover:hidden",
              disabled && "sdk:block!"
            )}
          />
          <NewAevatarItemHoverIcon
            className={clsx(
              "sdk:absolute sdk:group-hover:block sdk:hidden",
              disabled && "sdk:hidden!"
            )}
          />
          <div
            className={clsx(
              "sdk:px-[17px] sdk:pt-[16px] sdk:pb-[15px] sdk:relative sdk:flex "
            )}>
            <p
              className={clsx(
                "sdk:workflow-new-aevatar-item",
                disabled && "sdk:workflow-new-aevatar-item-disabled"
              )}>
              new g-aevatar
            </p>
          </div>
        </>
      ) : (
        <>
          <AevatarItemIcon
            className={clsx(
              "sdk:absolute sdk:group-hover:hidden",
              disabled && "sdk:block!"
            )}
          />
          <AevatarItemHoverIcon
            className={clsx(
              "sdk:absolute sdk:group-hover:block sdk:hidden",
              disabled && "sdk:hidden!"
            )}
          />
          <div className="sdk:px-[15px] sdk:py-[7px] sdk:relative sdk:flex sdk:flex-col ">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="sdk:workflow-aevatar-item-name sdk:truncate">
                    {name}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">{name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="sdk:workflow-aevatar-item-id sdk:truncate">
                    {agentType}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">{agentType}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
    </div>
  );
}
