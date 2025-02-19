import React from "react";
import { Button } from "../ui";

const WorkflowConfiguration = () => {
  return (
    <div className="h-screen bg-black text-white flex-row">
      {/* header */}
      <div className="relative w-full flex flex-column justify-between border-b-[1px] px-[40px] py-[15px] sdk:workflow-common-border">
        <h2 className="flex text-[18px] sdk:workflow-title">
          workflow&nbsp;configuration
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="sdk:workflow-common-border-stimulate text-[12px]"
          >
            stimulate
          </Button>
          <Button
            variant="default"
            className="sdk:workflow-title-button-save text-[12px]"
          >
            save
          </Button>
        </div>
      </div>
      {/* Sidebar */}
      <aside className="w-60 bg-zinc-900 p-4 flex flex-col gap-6">
        <div className="space-y-4">
          <div className="border border-gray-600 p-4 rounded">
            <p className="text-gray-400">α-avatar type #1</p>
            <Button variant="outline" className="w-full mt-2 border-gray-600">
              new α-avatar
            </Button>
          </div>
          <div className="border border-gray-600 p-4 rounded">
            <p className="text-gray-400">α-avatar type #2</p>
            <Button variant="outline" className="w-full mt-2 border-gray-600">
              new α-avatar
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <div className="flex flex-col items-center text-gray-400">
          <div className="border border-gray-400 p-4 rounded-md flex items-center justify-center">
            {/* <RefreshCw className="w-8 h-8" /> */}
          </div>
          <p className="mt-4 text-sm">
            begin by dragging and dropping or adding a card from the sidebar on
            the left!
          </p>
        </div>
      </main>
    </div>
  );
};

export default WorkflowConfiguration;
