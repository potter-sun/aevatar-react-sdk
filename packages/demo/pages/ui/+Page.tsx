import {
  MyGAevatar,
  EditGAevatar,
  ConfigProvider,
} from "@aevatar-react-sdk/ui-react";
import "@aevatar-react-sdk/ui-react/ui-react.css";
import { useCallback, useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
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

enum Stage {
  myGAevatar = "MyGAevatar",
  newGAevatar = "newGAevatar",
  editGAevatar = "editGAevatar",
}

export default function UI() {
  const [stage, setStage] = useState<Stage>(Stage.newGAevatar);
  const onNewGAevatar = useCallback(() => {
    console.log("onNewGAevatar");
    setStage(Stage.newGAevatar);
  }, []);

  const onEditGaevatar = useCallback(() => {
    setStage(Stage.newGAevatar);
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
        />
      )}
      {stage === Stage.newGAevatar && <EditGAevatar className="h-[600px]" />}
    </div>
  );
}
