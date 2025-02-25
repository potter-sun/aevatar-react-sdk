import { clientOnly } from "vike-react/clientOnly";
import { ConfigProvider, aevatarAI } from "@aevatar-react-sdk/ui-react";
import "@aevatar-react-sdk/ui-react/ui-react.css";
import { useCallback } from "react";

const LoginButton = clientOnly(
  () => import("../../components/auth/LoginButton")
);

const AuthButton = clientOnly(() => import("../../components/auth/AuthButton"));

ConfigProvider.setConfig({
  // connectUrl: "https://station-staging.aevatar.ai",
  requestDefaults: {
    // baseURL: "/aevatarURL",
    baseURL: "https://station-developer-staging.aevatar.ai/automatedx-client",
  },
});

export default function Page() {
  const onCreateAgent = useCallback(async () => {
    const allRes = await aevatarAI.services.agent.getAllAgentsConfiguration();
    console.log(allRes, "allRes==");
    // const result = await aevatarAI.createGAevatar({
    //   name: "AI Basic test",
    //   agentType: "AI Basic",
    //   properties: {
    //     modelProvider: "gpt",
    //     bio: "Agent biography",
    //     lore: "Agent world description",
    //     topic: "Agent interests",
    //   },
    // });
    // console.log(result, "createGAevatar==");
  }, []);
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:gap-20">
        <div className="basis-1/2 lg:self-center">
          <div className="max-w-[285px] lg:mx-auto">
            <div className="hidden lg:block">
              <LoginButton />
            </div>
          </div>
        </div>
        <div className="basis-1/2" />
        <div className="lg:hidden mt-8">
          <LoginButton />
        </div>
      </div>
      <AuthButton />

      <button type="button" onClick={onCreateAgent}>
        create Agent
      </button>
    </div>
  );
}
