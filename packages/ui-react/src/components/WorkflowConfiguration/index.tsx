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

  const [open, setOpen] = useState(false);
  const onClickWorkflowItem = useCallback(data => {
    setOpen(true);
  }, []);

  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="sdk:h-full sdk:workflow-common flex flex-col">
          {/* header */}
          <div className="sdk:relative sdk:w-full sdk:flex sdk:justify-between sdk:border-b-[1px] sdk:px-[40px] sdk:py-[15px] sdk:workflow-common-border">
            <h2 className="sdk:flex sdk:text-[18px] sdk:workflow-title">
              workflow&nbsp;configuration
            </h2>
            <div className="sdk:flex sdk:gap-2 ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="sdk:workflow-common-border-stimulate sdk:cursor-pointer"
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
                className="sdk:workflow-title-button-save sdk:cursor-pointer"
              >
                save
              </Button>
            </div>
          </div>
          {/* content */}

          <div className="sdk:flex sdk:flex-1 sdk:relative" ref={setContainer}>
            {/* Sidebar */}
            <Sidebar></Sidebar>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center relative">
              <Dialog open={open} onOpenChange={setOpen}>
                <Workflow onClick={onClickWorkflowItem}></Workflow>
                <DialogPortal container={container} asChild>
                  <DialogOverlay />
                  <WorkflowDialog isConfig></WorkflowDialog>
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
