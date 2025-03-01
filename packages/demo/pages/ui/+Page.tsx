import {
  MyGAevatar,
  CreateGAevatar,
  ConfigProvider,
  aevatarAI,
  EditGAevatarInner,
  AevatarProvider,
  Button,
} from "@aevatar-react-sdk/ui-react";
// import "@aevatar-react-sdk/ui-react/ui-react.css";
import { useCallback, useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
const LoginButton = clientOnly(
  () => import("../../components/auth/LoginButton")
);

import Form from "@rjsf/core";
import type { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const schema: RJSFSchema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false },
  },
};

const AuthButton = clientOnly(() => import("../../components/auth/AuthButton"));

ConfigProvider.setConfig({
  connectUrl: "https://auth-station-staging.aevatar.ai",
  requestDefaults: {
    // baseURL: "/aevatarURL",
    baseURL: "https://station-developer-staging.aevatar.ai/test-client",
  },
});

enum Stage {
  myGAevatar = "MyGAevatar",
  newGAevatar = "newGAevatar",
  editGAevatar = "editGAevatar",
}

export default function UI() {
  const [stage, setStage] = useState<Stage>();
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

  const onAuthFinish = useCallback(() => {
    setStage(Stage.myGAevatar);
  }, []);
  const [agentSchema, setAgentSchema] = useState<any>(schema);
  const getSchema = useCallback(async () => {
    const result = await aevatarAI.services.agent.getAllAgentsConfiguration();
    console.log(result, "result==");
    const list = result.filter((item) => item.agentType === "frontagenttest");
    const schema = JSON.parse(list[0]?.propertyJsonSchema ?? "{}");
    // console.log(schemaParser(schema), "schemaParser====");
    setAgentSchema(schema);
    console.log(result, "result===");
  }, []);

  const log = (type: any) => console.log.bind(console, type);

  return (
    <div>
      <AevatarProvider>
        <LoginButton />

        <AuthButton onFinish={onAuthFinish} />

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
      </AevatarProvider>

      <Button onClick={getSchema}>getSchema</Button>

      <Form
        schema={agentSchema}
        validator={validator}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />
    </div>
  );
}
