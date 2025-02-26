import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { useCallback, useEffect } from "react";
import { aevatarAI, ConfigProvider } from "@aevatar-react-sdk/ui-react";
import { useAuthToken } from "../../hooks/useAuthToken";

export default function AuthButton({ onFinish }: { onFinish: () => void }) {
  const { walletInfo } = useConnectWallet();
  console.log(walletInfo, "walletInfo==");
  const getAutoToken = useAuthToken();

  useEffect(() => {
    ConfigProvider.setConfig({
      getAevatarAuthToken: getAutoToken,
    });
  }, [getAutoToken]);

  const onGetAuthToken = useCallback(async () => {
    await getAutoToken();
    onFinish();
  }, [getAutoToken, onFinish]);

  const getList = useCallback(async () => {
    const result = await aevatarAI.services.agent.getAllAgentsConfiguration();

    console.log(result, "result===");
  }, []);

  return (
    <div className="flex gap-10">
      <button type="button" onClick={onGetAuthToken}>
        AuthButton
      </button>

      <button type="button" onClick={getList}>
        getAllAgentsConfiguration
      </button>
    </div>
  );
}
