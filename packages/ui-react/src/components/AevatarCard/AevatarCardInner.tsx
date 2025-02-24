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
      <div className="pb-[12px] pt-[16px] pr-[14px] pl-[14px] border-b border-[#303030] border-solid">
        <div className="flex justify-between items-center">
          <div className="flex font-syne text-white text-[15px] font-semibold leading-normal lowercase pb-[9px]">
            <div>{`${"ai basic"} ${"#1"}`}</div>
          </div>
          <Setting
            role="img"
            className="cursor-pointer"
            onClick={() => onEditGaevatar(props.id)}
          />
        </div>
        <div className="font-mono text-[#B9B9B9] text-[11px] font-normal leading-normal lowercase">
          id: {1}
        </div>
      </div>
      <div className="pb-[6px] pt-[12px] pr-[14px] pl-[14px] flex flex-col items-start gap-[12px] self-stretch">
        {Object.entries(props.properties).map((item) => (
          <div key={item[0]}>
            <div className="text-[#606060] text-[11px] pb-[10px]">
              {item[0]}
            </div>
            <div className="flex flex-wrap gap-[10px]">
              {propertiesValue(item[1]).map((info) => (
                <div
                  className="p-[4px] bg-[#303030] text-[12px] text-white "
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
