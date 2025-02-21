import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import Delete from "../../assets/svg/delete.svg?react";
import Add from "../../assets/svg/add.svg?react";
import "./index.css";
import { useCallback } from "react";
import { Button } from "../ui";
export interface IAevatarCardInnerProps {
  className?: string;
  isNew?: boolean;
  onClick?: (data: any) => void;
  deleteNode: any;
  nodeId?: string;
}

export default function AevatarCardInner({
  className,
  isNew,
  onClick,
  deleteNode,
  nodeId,
  ...props
}: IAevatarCardInnerProps & IAgentInfoDetail) {
  const propertiesValue = useCallback((value: string | string[]) => {
    if (Array.isArray(value)) return value;
    return [value];
  }, []);
  const handleDeleteClick = e => {
    e.stopPropagation();
    deleteNode(nodeId);
  };
  return isNew ? (
    <div
      onClick={() => {
        onClick?.(isNew);
      }}
    >
      <div
        className={`sdk:aevatar-item-background sdk:cutCorner sdk:hover:border sdk:hover:cutCorner-border sdk:workflow-common-border sdk:w-[234px] ${className}`}
      >
        <div className="sdk:pb-[12px] sdk:pt-[16px] sdk:pr-[14px] sdk:pl-[14px] sdk:border-b sdk:border-[var(--sdk-border-color)] sdk:border-solid">
          <div className="sdk:flex sdk:justify-between sdk:items-center">
            <div className="sdk:flex sdk:font-syne sdk:text-white sdk:text-[15px] sdk:font-semibold sdk:leading-normal sdk:lowercase sdk:pb-[9px]">
              <div>ai basic &nbsp;</div>
              <div>#1</div>
            </div>
            <Delete
              className="sdk:cursor-pointer"
              onClick={handleDeleteClick}
            />
          </div>
          <div className="sdk:font-mono sdk:text-[--sdk-gray-color] sdk:text-[11px] sdk:font-normal sdk:leading-normal sdk:lowercase">
            id: {1}
          </div>
        </div>
        <div className="sdk:pb-[6px] sdk:pt-[12px] sdk:pr-[14px] sdk:pl-[14px] sdk:flex sdk:flex-col sdk:items-start sdk:gap-[12px] sdk:self-stretch">
          <Button className="sdk:w-[85px] sdk:h-[30px] sdk:workflow-common-border sdk:flex sdk:justify-center sdk:items-center">
            <Add></Add>add
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div
      onClick={() => {
        onClick?.(isNew);
      }}
    >
      <div
        className={`sdk:aevatar-item-background sdk:w-[234px] sdk:cutCorner sdk:hover:border sdk:hover:cutCorner-border sdk:workflow-common-border ${className}`}
      >
        <div className="sdk:pb-[12px] sdk:pt-[16px] sdk:pr-[14px] sdk:pl-[14px] sdk:border-b sdk:border-[var(--sdk-border-color)] sdk:border-solid">
          <div className="sdk:flex sdk:justify-between sdk:items-center">
            <div className="sdk:flex sdk:font-syne sdk:text-white sdk:text-[15px] sdk:font-semibold sdk:leading-normal sdk:lowercase sdk:pb-[9px]">
              <div>ai basic &nbsp;</div>
              <div>#1</div>
            </div>
            <Delete
              className="sdk:cursor-pointer"
              onClick={handleDeleteClick}
            />
          </div>
          <div className="sdk:font-mono sdk:text-[--sdk-gray-color] sdk:text-[11px] sdk:font-normal sdk:leading-normal sdk:lowercase">
            id: {1}
          </div>
        </div>
        <div className="sdk:pb-[6px] sdk:pt-[12px] sdk:pr-[14px] sdk:pl-[14px] sdk:flex sdk:flex-col sdk:items-start sdk:gap-[12px] sdk:self-stretch">
          {Object.entries(props.properties).map(item => (
            <div key={item[0]}>
              <div className="sdk:text-[var(--sdk-gray-text)] sdk:text-[11px] sdk:pb-[10px]">
                {item[0]}
              </div>
              <div className="sdk:flex sdk:flex-wrap sdk:gap-[10px]">
                {propertiesValue(item[1]).map(info => (
                  <div
                    className="sdk:p-[4px] sdk:bg-[var(--sdk-border-color)] sdk:text-[12px] sdk:text-white "
                    key={info}
                  >
                    {info}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
