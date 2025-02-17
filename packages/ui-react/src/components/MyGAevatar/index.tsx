import { useAtom } from "jotai";
import PageLoading from "../PageLoading";
import { loadingAtom } from "../../state/atoms";
import clsx from "clsx";
import AevatarCard from "../AevatarCard";
import { Button } from "../ui";
import AddIcon from "../../assets/svg/add.svg?react";
import "./index.css";

export interface IMyGAevatarProps {
  height?: number | string;
  width?: number | string;
  className?: string;
}

export default function MyGAevatar({
  height = "100vh",
  width,
  className,
}: IMyGAevatarProps) {
  const [, setShow] = useAtom(loadingAtom);

  return (
    <div
      className={clsx(
        "relative bg-black flex flex-col aevatarai-gaevatar-list-wrapper",
        className
      )}
      style={{ height, width }}>
      <div
        className={clsx(
          "flex justify-between items-center mb-[23px] border border-[#303030]",
          "pt-[36px] pb-[17px] pl-[20px] pr-[20px]",
          "lg:pl-[40px] lg:pr-[40px] lg:pb-[24px] lg:mb-[0]"
        )}>
        <div className="text-white font-syne text-[18px] font-semibold lowercase aevatarai-text-gradient">
          my g-aevatars
        </div>
        <Button className="p-[8px] px-[18px] gap-[10px] text-[#fff] hover:text-[#303030] ">
          <AddIcon style={{ width: 14, height: 14 }} />
          <span className="text-center font-syne text-[12px] font-semibold lowercase leading-[14px]">
            new g-aevatar
          </span>
        </Button>
      </div>
      <div className="aevatarai-gaevatar-list overflow-auto flex flex-col items-center flex-1 gap-[20px]">
        {new Array(10).fill("").map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <AevatarCard key={index} />
        ))}
      </div>

      <PageLoading />
    </div>
  );
}
