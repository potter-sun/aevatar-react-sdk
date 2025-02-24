import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "../ui";
import { DnDFlow as Workflow } from "../Workflow";
import Sidebar from "./sidebar";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "../Workflow/DnDContext";
import WorkflowDialog from "./dialog";
const WorkflowConfiguration = () => {
  const [container, setContainer] = React.useState(null);

  const [open, setOpen] = useState(true);
  const onClickWorkflowItem = useCallback(data => {
    setOpen(true);
  }, []);

  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="sdk:h-full sdk:workflow-common flex flex-col">
          {/* header */}
          <div className=" sdk:relative sdk:w-full sdk:flex sdk:justify-between sdk:items-center sdk:border-b-[1px] sdk:px-[20px] sdk:py-[22px] sdk:sm:px-[40px] sdk:sm:py-[15px] sdk:workflow-common-border">
            <h2 className="sdk:flex sdk:text-[18px] sdk:workflow-title sdk:w-[146px] sdk:sm:w-[300px] sdk:flex-wrap">
              workflow configuration
            </h2>
            <div className="sdk:flex sdk:gap-2 ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="sdk:workflow-common-border-stimulate sdk:cursor-pointer sdk:h-[30px]"
                  >
                    stimulate
                  </Button>
                </DialogTrigger>
                <DialogPortal container={container} asChild>
                  <DialogOverlay />
                  <WorkflowDialog></WorkflowDialog>
                </DialogPortal>
              </Dialog>
              <Button
                variant="default"
                className="sdk:workflow-title-button-save sdk:cursor-pointer sdk:h-[30px]"
              >
                save
              </Button>
            </div>
          </div>
          {/* content */}

          <div
            className="sdk:flex sdk:flex-1 sdk:relative sdk:sm:flex-row sdk:flex-col"
            ref={setContainer}
          >
            {/* Sidebar */}
            <Sidebar></Sidebar>

            {/* Main Content */}
            <main className="sdk:flex-1 sdk:flex sdk:flex-col sdk:items-center sdk:justify-center sdk:relative">
              <Dialog open={open} onOpenChange={setOpen}>
                <Workflow onClick={onClickWorkflowItem}></Workflow>
                <DialogPortal container={container} asChild>
                  <DialogOverlay />
                  <WorkflowDialog></WorkflowDialog>
                </DialogPortal>
              </Dialog>
            </main>
          </div>
        </div>
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default WorkflowConfiguration;
