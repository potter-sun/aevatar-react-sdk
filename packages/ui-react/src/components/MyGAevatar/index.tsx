import { useAtom } from "jotai";
import PageLoading from "../PageLoading";
import { loadingAtom } from "../../state/atoms";
import EmptyIcon from "../../assets/svg/empty-gaevatar.svg?react";
import clsx from "clsx";
import AevatarCard from "../AevatarCard";
import { Button } from "../ui";
import AddIcon from "../../assets/svg/add.svg?react";
import "./index.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sleep } from "@aevatar-react-sdk/utils";
import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import CommonHeader from "../CommonHeader";
export interface IMyGAevatarProps {
  height?: number | string;
  width?: number | string;
  className?: string;
  maxAgentCount?: number;
  onNewGAevatar?: () => void;
  onEditGaevatar: (id: string) => void;
}

const agentInfo: IAgentInfoDetail = {
  id: "e087d0d6-ec86-4b4e-8bf1-a4c616fbffdf",
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

export default function MyGAevatar({
  height = "100vh",
  width,
  className,
  maxAgentCount = 999999,
  onNewGAevatar,
  onEditGaevatar,
}: IMyGAevatarProps) {
  const [, setShow] = useAtom(loadingAtom);
  const [gAevatarList, setGAevatarList] = useState<IAgentInfoDetail[]>();

  const getGAevatarList = useCallback(async () => {
    setShow(true);
    await sleep(2000);
    setGAevatarList(new Array(10).fill("").map(() => agentInfo));
    setShow(false);
  }, [setShow]);

  useEffect(() => {
    getGAevatarList();
  }, [getGAevatarList]);

  const newGA = useMemo(
    () => (
      <Button
        className="p-[8px] px-[18px] gap-[10px] text-[#fff] hover:text-[#303030]"
        onClick={onNewGAevatar}>
        <AddIcon style={{ width: 14, height: 14 }} />
        <span className="text-center font-syne text-[12px] font-semibold lowercase leading-[14px]">
          new g-aevatar
        </span>
      </Button>
    ),
    [onNewGAevatar]
  );

  return (
    <div
      className={clsx(
        "relative bg-black flex flex-col aevatarai-gaevatar-list-wrapper",
        className
      )}
      style={{ height, width }}>
      <CommonHeader
        leftEle={"my g-aevatars"}
        rightEle={gAevatarList && maxAgentCount < gAevatarList.length && newGA}
      />

      <div
        className={clsx(
          "overflow-auto flex-1",
          !gAevatarList && "flex justify-center items-center"
        )}>
        {!gAevatarList && (
          <div className="flex flex-col justify-center items-center gap-[20px]">
            <EmptyIcon />
            {newGA}
          </div>
        )}
        {gAevatarList && (
          <div
            className={clsx(
              "grid grid-cols-1 place-items-center pt-[23px] gap-[20px]",
              "md:grid-cols-3 md:max-w-[762px] md:pt-[0] mx-auto",
              "aevatarai-gaevatar-list"
            )}>
            {gAevatarList.map((gAevatar, index) => (
              <AevatarCard
                agentInfo={gAevatar}
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                onEditGaevatar={onEditGaevatar}
              />
            ))}
          </div>
        )}
      </div>

      <PageLoading />
    </div>
  );
}
