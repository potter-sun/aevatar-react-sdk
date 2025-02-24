import * as DialogPrimitive from "@radix-ui/react-dialog";
import avatar from "../../assets/svg/add.svg";
import MsgLoadingIcon from "../../assets/svg/msg-loading.svg?react";
import CloseIcon from "../../assets/svg/close.svg?react";
import clsx from "clsx";
import { Button, DialogClose, DialogTitle } from "../ui";
interface IProps {
  icon?: string;
  isConfig?: boolean;
}
enum MsgType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
  loading = "loading",
}
const msg = `ai agent workflow: crypto scam detection Input -&gt; collect user reports,
      blockchain transactions, social media data. analysis -&gt; AI scans for
      scam patterns, smart contract risks, sentiment trends. decision -&gt;
      assigns a risk score; flags high-risk projects. action -&gt; logs findings
      on-chain, alerts community updates. learning -&gt; adapts based on
      community feedback,improving accuracy.`;
const MsgComp = ({ data, type }: { data?: string; type?: MsgType }) => {
  return (
    <div
      className={clsx(
        "sdk:workflow-common-desc-bg sdk:p-3 sdk:rounded-tl-none sdk:rounded-tr-[18px] sdk:rounded-br-[18px] sdk:rounded-bl-[18px] sdk:flex",
        !data && "sdk:w-fit",
        type === MsgType.success && "sdk:workflow-common-success-text",
        type === MsgType.warning && "sdk:workflow-common-warning-text"
      )}
    >
      {data ? data : <MsgLoadingIcon></MsgLoadingIcon>}
    </div>
  );
};

export default function WorkflowDialog({ icon, isConfig }: IProps) {
  return (
    <DialogPrimitive.Content className="sdk:z-6 sdk:absolute sdk:right-[11px] sdk:top-[12px] sdk:bottom-[13px] sdk:workflow-common-bg sdk:w-[232px] sdk:px-[20px] sdk:pt-[40px] sdk:pb-[20px] sdk:workflow-common-border sdk:border sdk:flex">
      <DialogClose>
        <CloseIcon className="sdk:absolute sdk:right-[6px] top-[6px] sdk:cursor-pointer"></CloseIcon>
      </DialogClose>
      {isConfig ? (
        <div className="sdk:overflow-auto sdk:h-full sdk:flex sdk:flex-col gap-[23px]">
          <DialogTitle className="sdk:mb-[23px] sdk:text-[15px] sdk:font-bold">
            <p>g-agent configuration</p>
          </DialogTitle>
          <div>1234</div>
          <Button
            variant="default"
            className="sdk:workflow-title-button-save sdk:cursor-pointer sdk:absolute sdk:bottom-[20px] sdk:w-[192px]"
          >
            save
          </Button>
        </div>
      ) : (
        <div className="sdk:overflow-auto sdk:h-full">
          <DialogTitle className="sdk:mb-[23px] sdk:text-[15px] sdk:font-bold">
            <p>stimulate g-aevatar</p>
          </DialogTitle>
          <div className="sdk:flex sdk:gap-[10px] sdk:flex-col">
            <img src={icon || avatar} width={32} height={32}></img>
            <MsgComp data={msg}></MsgComp>
            <MsgComp></MsgComp>
            <MsgComp data={msg} type={MsgType.success}></MsgComp>
          </div>
        </div>
      )}
    </DialogPrimitive.Content>
  );
}
