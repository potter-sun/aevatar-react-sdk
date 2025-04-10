import * as DialogPrimitive from "@radix-ui/react-dialog";
import MsgLoadingIcon from "../../assets/svg/msg-loading.svg?react";
import CloseIcon from "../../assets/svg/close.svg?react";
import clsx from "clsx";
import { DialogClose, DialogTitle } from "../ui";
import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
import WorkflowAevatarEdit, {
  type IWorkflowAevatarEditProps,
} from "../WorkflowAevatarEdit";
import AevatarLogo from "../../assets/aevatar.png";

interface IProps {
  isNew?: boolean;
  agentItem?: Partial<IAgentInfoDetail>;
  nodeId?: string;
  onGaevatarChange?: IWorkflowAevatarEditProps["onGaevatarChange"];
}

export default function WorkflowDialog({
  isNew,
  agentItem,
  nodeId,
  onGaevatarChange,
}: IProps) {
  return (
    <DialogPrimitive.Content className="sdk:z-6 sdk:absolute sdk:right-[20px] sdk:left-[19px] sdk:top-[52px] sdk:sm:right-[11px] sdk:sm:left-auto sdk:sm:top-[12px] sdk:sm:bottom-[13px] sdk:workflow-common-bg sdk:w-auto sdk:sm:w-[232px] sdk:px-[26px] sdk:sm:px-[19px] sdk:pt-[19px] sdk:sm:pt-[40px] sdk:pb-[19px] sdk:workflow-common-border sdk:border sdk:flex">
      <DialogClose>
        <CloseIcon
          className="sdk:absolute sdk:right-[15px] sdk:sm:right-[6px] sdk:top-[17px] sdk:sm:top-[6px] sdk:cursor-pointer"
          width={24}
          height={24}
        />
      </DialogClose>
      <WorkflowAevatarEdit
        isNew={isNew}
        agentItem={agentItem}
        nodeId={nodeId}
        onGaevatarChange={onGaevatarChange}
      />
    </DialogPrimitive.Content>
  );
}
