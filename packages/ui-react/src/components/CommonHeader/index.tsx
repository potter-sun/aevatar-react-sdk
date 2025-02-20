import clsx from "clsx";
import type { ReactNode } from "react";

export interface ICommonHeaderProps {
  leftEle?: string | ReactNode;
  rightEle?: ReactNode;
  className?: string;
}

export default function CommonHeader({
  leftEle,
  rightEle,
  className,
}: ICommonHeaderProps) {
  return (
    <div
      className={clsx(
        "flex justify-between items-center border border-[#303030]",
        "pt-[36px] pb-[17px] pl-[20px] pr-[20px]",
        "md:pl-[40px] md:pr-[40px] md:pb-[24px] md:border-none",
        className
      )}>
      <div className="text-white font-syne text-[18px] font-semibold lowercase aevatarai-text-gradient">
        {leftEle}
      </div>
      {rightEle}
    </div>
  );
}
