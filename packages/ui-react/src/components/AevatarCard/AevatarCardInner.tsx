import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import Setting from "../../assets/svg/setting.svg?react";
import { useCallback } from "react";

export interface IAevatarCardInnerProps {
  className?: string;
  onEditGaevatar: (id: string) => void;
}

export default function AevatarCardInner({
  className,
  onEditGaevatar,
  ...props
}: IAevatarCardInnerProps & IAgentInfoDetail) {
  const propertiesValue = useCallback((value: string | string[]) => {
    if (Array.isArray(value)) return value;
    return [value];
  }, []);

  return (
    <div className={className}>
      <div className="sdk:pb-[12px] sdk:pt-[16px] sdk:pr-[14px] sdk:pl-[14px] sdk:border-b sdk:border-[#303030] sdk:border-solid">
        <div className="sdk:flex sdk:justify-between sdk:items-center">
          <div className="sdk:flex sdk:font-syne sdk:text-white sdk:text-[15px] sdk:font-semibold sdk:leading-normal sdk:lowercase sdk:pb-[9px]">
            <div>{`${"ai basic"} ${"#1"}`}</div>
          </div>
          <Setting
            role="img"
            className="sdk:cursor-pointer"
            onClick={() => onEditGaevatar(props.id)}
          />
        </div>
        <div className="sdk:font-mono sdk:text-[#B9B9B9] sdk:text-[11px] sdk:font-normal sdk:leading-normal sdk:lowercase">
          id: {1}
        </div>
      </div>
      <div className="sdk:pb-[6px] sdk:pt-[12px] sdk:pr-[14px] sdk:pl-[14px] sdk:flex sdk:flex-col sdk:items-start sdk:gap-[12px] sdk:self-stretch">
        {Object.entries(props.properties).map((item) => (
          <div key={item[0]}>
            <div className="sdk:text-[#606060] sdk:text-[11px] sdk:pb-[10px]">
              {item[0]}
            </div>
            <div className="sdk:flex sdk:flex-wrap sdk:gap-[10px]">
              {propertiesValue(item[1]).map((info) => (
                <div
                  className="sdk:p-[4px] sdk:bg-[#303030] sdk:text-[12px] sdk:text-white"
                  key={info}>
                  {info}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
