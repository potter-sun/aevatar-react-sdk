import {
  MyGAevatar,
  CreateGAevatar,
  aevatarAI,
  EditGAevatarInner,
  AevatarProvider,
  Button,
  WorkflowConfiguration,
} from "@aevatar-react-sdk/ui-react";
// import "@aevatar-react-sdk/ui-react/ui-react.css";
import { useCallback, useEffect, useState } from "react";

import { clientOnly } from "vike-react/clientOnly";
import { sleep } from "@aevatar-react-sdk/utils";

import type { IAgentInfoDetail } from "@aevatar-react-sdk/services";
const LoginButton = clientOnly(
  () => import("../../components/auth/LoginButton")
);

const AuthButton = clientOnly(() => import("../../components/auth/AuthButton"));

// ConfigProvider.setConfig({
//   connectUrl: "https://auth-station-staging.aevatar.ai",
//   requestDefaults: {
//     // baseURL: "/aevatarURL",
//     baseURL: "https://station-developer-staging.aevatar.ai/test-client",
//   },
// });

enum Stage {
  myGAevatar = "MyGAevatar",
  newGAevatar = "newGAevatar",
  editGAevatar = "editGAevatar",
  Workflow = "Workflow",
}

export default function UI() {
  const [stage, setStage] = useState<Stage>();
  const [gaevatarList, setGaevatarList] = useState<IAgentInfoDetail[]>();
  const onNewGAevatar = useCallback(() => {
    console.log("onNewGAevatar");
    setStage(Stage.newGAevatar);
  }, []);

  const [editAgents, setEditAgents] = useState<{
    agentTypeList: string[];
    jsonSchemaString?: string;
    properties?: Record<string, string>;
    agentName: string;
    agentId: string;
  }>();

  const onEditGaevatar = useCallback(async (id: string) => {
    const result = await aevatarAI.services.agent.getAgentInfo(id);
    console.log(result, "result===onEditGaevatar");
    const agentTypeList = [result.agentType];

    setEditAgents({
      agentId: result.id,
      agentTypeList,
      jsonSchemaString: result?.propertyJsonSchema,
      agentName: result.name,
      properties: result.properties,
    });

    setStage(Stage.editGAevatar);
  }, []);

  const onAuthFinish = useCallback(() => {}, []);

  const onShowGaevatar = useCallback(() => {
    setStage(Stage.myGAevatar);
  }, []);

  const getGaevatarList = useCallback(async () => {
    const result = await aevatarAI.services.agent.getAgents({
      pageIndex: 0,
      pageSize: 100,
    });
    const list = await Promise.all(
      result.map(async (item) => {
        const result = await aevatarAI.services.agent.getAgentInfo(item.id);
        return { ...result, businessAgentGrainId: item.businessAgentGrainId };
      })
    );
    console.log(list, "list===");
    setGaevatarList(list);
  }, []);

  const onShowWorkflow = useCallback(async () => {
    getGaevatarList();
    setStage(Stage.Workflow);
  }, [getGaevatarList]);

  const getTokenByclient = useCallback(async () => {
    await aevatarAI.getAuthTokenWithClient({
      grant_type: "password",
      scope: "Aevatar",
      username: (import.meta as any).env.VITE_APP_SERVICE_USERNAME,
      client_id: "AevatarAuthServer",
      password: (import.meta as any).env.VITE_APP_SERVICE_PASSWORD,
    } as any);
  }, []);

  const onGaevatarChange = useCallback(
    async (isCreate: boolean, data: { params: any; agentId?: string }) => {
      console.log(isCreate, data, "isCreate, data=");
      let result: IAgentInfoDetail;
      if (isCreate) {
        result = await aevatarAI.services.agent.createAgent(data.params);
      } else {
        if (!data.agentId) throw "Not agentId";
        result = await aevatarAI.services.agent.updateAgentInfo(
          data.agentId,
          data.params
        );
      }
      await sleep(500);
      await getGaevatarList();
      return result;
    },
    [getGaevatarList]
  );

  const [editWorkflow, setEditWorkflow] = useState<any>();

  useEffect(() => {
    // sleep(1000).then(() => {
    //   setEditWorkflow({
    //     workflowGrainId: "string",
    //     workUnitRelations: workflowRelation,
    //   });
    // });
  }, []);

  return (
    <div>
      <AevatarProvider>
        <LoginButton />

        <AuthButton onFinish={onAuthFinish} />
        <Button onClick={getTokenByclient}>getTokenByclient</Button>

        <Button onClick={onShowGaevatar}>show gaevatar</Button>
        <Button onClick={onShowWorkflow}>show workflow</Button>

        <div className="text-[12px] lg:text-[24px]">aad</div>

        {stage === Stage.myGAevatar && (
          <MyGAevatar
            height={600}
            // maxGAevatarCount={1}
            onNewGAevatar={onNewGAevatar}
            onEditGaevatar={onEditGaevatar}
          />
        )}
        {stage === Stage.editGAevatar && editAgents && (
          <EditGAevatarInner
            type="edit"
            className="h-[600px]"
            {...editAgents}
            onBack={() => {
              setStage(Stage.myGAevatar);
            }}
            onSuccess={() => {
              setStage(Stage.myGAevatar);
            }}
          />
        )}
        {stage === Stage.newGAevatar && (
          <CreateGAevatar
            className="h-[600px]"
            onBack={() => {
              setStage(Stage.myGAevatar);
            }}
            onSuccess={() => {
              setStage(Stage.myGAevatar);
            }}
          />
        )}
        {stage === Stage.Workflow && (
          <div className="h-[900px]">
            <WorkflowConfiguration
              sidebarConfig={{ gaevatarList, isNewGAevatar: true }}
              onBack={() => {
                setStage(undefined);
              }}
              onSave={(workflowId: string) => {
                console.log(workflowId, "workflowId==");
              }}
              editWorkflow={editWorkflow}
              onGaevatarChange={onGaevatarChange}
            />
          </div>
        )}
      </AevatarProvider>
    </div>
  );
}
