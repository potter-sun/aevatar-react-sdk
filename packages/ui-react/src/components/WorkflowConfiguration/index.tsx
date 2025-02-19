import React from "react";
import { Button } from "../ui";
import AevatarItemMini from "./aevatarItemMini";
import { DnDFlow as Workflow } from "../Workflow";
import Sidebar from "./sidebar";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "../Workflow/DnDContext";
const WorkflowConfiguration = () => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="sdk:h-full sdk:workflow-common flex flex-col">
          {/* header */}
          <div className="sdk:relative sdk:w-full sdk:flex sdk:justify-between sdk:border-b-[1px] sdk:px-[40px] sdk:py-[15px] sdk:workflow-common-border">
            <h2 className="sdk:flex sdk:text-[18px] sdk:workflow-title">
              workflow&nbsp;configuration
            </h2>
            <div className="sdk:flex sdk:gap-2">
              <Button
                variant="outline"
                className="sdk:workflow-common-border-stimulate"
              >
                stimulate
              </Button>
              <Button
                variant="default"
                className="sdk:workflow-title-button-save "
              >
                save
              </Button>
            </div>
          </div>
          {/* content */}
          <div className="sdk:flex sdk:flex-1">
            {/* Sidebar */}
            <Sidebar></Sidebar>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center relative">
              <Workflow></Workflow>
            </main>
          </div>
        </div>
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default WorkflowConfiguration;
