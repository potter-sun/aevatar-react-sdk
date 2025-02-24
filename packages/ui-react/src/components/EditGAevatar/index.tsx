import clsx from "clsx";
import EditGAevatarInner from "../EditGAevatarInner";
import { useCallback, useEffect, useMemo, useState } from "react";
import { aevatarAI } from "../../utils";
import type { IAgentsConfiguration } from "@aevatar-react-sdk/services";
import { sleep } from "@aevatar-react-sdk/utils";
import PageLoading from "../PageLoading";
import { useAtom } from "jotai";
import { loadingAtom } from "../../state/atoms";
import { useUpdateEffect } from "react-use";

export interface IEditGAevatarProps {
  className?: string;
  onBack?: () => void;
  onSuccess?: () => void;
}

export default function EditGAevatar({
  className,
  onBack,
  onSuccess,
}: IEditGAevatarProps) {
  const [, setShow] = useAtom(loadingAtom);

  const [agentConfiguration, setAgentConfiguration] =
    useState<Record<string, IAgentsConfiguration>>();

  const getAllAgentsConfiguration = useCallback(async () => {
    const result = await aevatarAI.services.agent.getAllAgentsConfiguration();
    if (!result) return;
    const configuration: any = {};
    result.forEach((item) => {
      configuration[item.agentType] = item.agentParams;
    });
    setAgentConfiguration(configuration);
  }, []);

  const agentTypeList = useMemo(
    () => Object.keys(agentConfiguration ?? {}),
    [agentConfiguration]
  );
  const [agentType, setAgentType] = useState<string>();

  const configuarationParams = useMemo(
    () => agentConfiguration?.[agentType ?? agentTypeList[0]],
    [agentConfiguration, agentType, agentTypeList]
  );

  useEffect(() => {
    if (agentConfiguration) setShow(false);
    else setShow(true);
  }, [agentConfiguration, setShow]);

  useUpdateEffect(() => {
    setAgentType(agentTypeList[0]);
  }, [agentTypeList]);

  console.log(agentType, "agentType==");

  useEffect(() => {
    getAllAgentsConfiguration();
    // TODO test
    // sleep(1000).then(() => {
    //   setAgentConfiguration({
    //     "AevatarTemplate.GAgents.workers/XWorkerGAgentTEST": {
    //       agentType: "InvestmentContent",
    //       fullName: "Aevatar.Application.Grains.Agents.Creator.CreatorGAgent",
    //       agentParams: [
    //         {
    //           name: "creatorgagent1",
    //           type: "System.String",
    //         },
    //         {
    //           name: "InvestmentContent",
    //           type: "System.Enum",
    //         },
    //       ],
    //     },
    //     XWorkerGAgentSelect: {
    //       agentType: "AevatarTemplate.GAgents.workers/XWorkerGAgent1",
    //       fullName: "Aevatar.Application.Grains.Agents.Creator.CreatorGAgent",

    //       agentParams: [
    //         {
    //           name: "InvestmentContent",
    //           type: "System.Enum",
    //         },
    //       ],
    //     },

    //     creatorgagentINput: {
    //       agentType: "creatorgagent1",
    //       fullName: "Aevatar.Application.Grains.Agents.Creator.CreatorGAgent",

    //       agentParams: [
    //         {
    //           name: "creatorgagent1",
    //           type: "System.String",
    //         },
    //       ],
    //     },

    //     "AevatarTemplate.GAgents.workers/XWorkerGAgent": {
    //       agentType: "AevatarTemplate.GAgents.workers/XWorkerGAgent",
    //       fullName: "Aevatar.Application.Grains.Agents.Creator.CreatorGAgent",

    //       agentParams: null,
    //     },
    //     creatorgagent: {
    //       agentType: "creatorgagent",
    //       fullName: "Aevatar.Application.Grains.Agents.Creator.CreatorGAgent",
    //       agentParams: null,
    //     },
    //   });
    // });
  }, [getAllAgentsConfiguration]);

  return (
    <div
      className={clsx(
        "relative bg-black overflow-auto aevatarai-edit-gaevatar-wrapper",
        className
      )}>
      {agentType && (
        <EditGAevatarInner
          defaultAgentType={agentType}
          agentTypeList={agentTypeList}
          configuarationParams={configuarationParams?.agentParams}
          onGagentChange={setAgentType}
          onBack={onBack}
          onSuccess={onSuccess}
        />
      )}
      <PageLoading />
    </div>
  );
}
