import {
  MyGAevatar,
  CreateGAevatar,
  ConfigProvider,
  aevatarAI,
  EditGAevatarInner,
  type IConfigurationParams,
} from "@aevatar-react-sdk/ui-react";
import "@aevatar-react-sdk/ui-react/ui-react.css";
import { useCallback, useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
const LoginButton = clientOnly(
  () => import("../../components/auth/LoginButton")
);

const AuthButton = clientOnly(() => import("../../components/auth/AuthButton"));

ConfigProvider.setConfig({
  connectUrl: "https://station-staging.aevatar.ai",
  requestDefaults: {
    // baseURL: "/aevatarURL",
    baseURL: "https://station-developer-staging.aevatar.ai/automatedx-client",
  },
});

enum Stage {
  myGAevatar = "MyGAevatar",
  newGAevatar = "newGAevatar",
  editGAevatar = "editGAevatar",
}

export default function UI() {
  const [stage, setStage] = useState<Stage>(Stage.myGAevatar);
  const onNewGAevatar = useCallback(() => {
    console.log("onNewGAevatar");
    setStage(Stage.newGAevatar);
  }, []);

  const [editAgents, setEditAgents] = useState<{
    agentTypeList: string[];
    configuarationParams: IConfigurationParams[] | null;
    agentName: string;
    agentId: string;
  }>();

  const onEditGaevatar = useCallback(async (id: string) => {
    const result = await aevatarAI.services.agent.getAgentInfo(id);
    console.log(result, "result===onEditGaevatar");
    const agentTypeList = [result.agentType];
    const configuarationParams: IConfigurationParams[] = Object.entries(
      result.properties ?? {}
    ).map((item) => ({
      name: item[0],
      type: "System.String",
      value: item[1],
    }));
    setEditAgents({
      agentId: result.id,
      agentTypeList,
      configuarationParams,
      agentName: result.name,
    });

    setStage(Stage.editGAevatar);
  }, []);
  return (
    <div>
      <LoginButton />

      <AuthButton />

      <div className="text-[12px] lg:text-[24px]">aad</div>

      {stage === Stage.myGAevatar && (
        <MyGAevatar
          height={600}
          onNewGAevatar={onNewGAevatar}
          onEditGaevatar={onEditGaevatar}
          userAddress={""}
        />
      )}
      {stage === Stage.editGAevatar && editAgents && (
        <EditGAevatarInner
          type="edit"
          {...editAgents}
          onBack={() => {
            setStage(Stage.myGAevatar);
          }}
        />
      )}
      {stage === Stage.newGAevatar && <CreateGAevatar className="h-[600px]" />}
    </div>
  );
}
