import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { useCallback } from "react";

export default function LoginButton() {
  const { connectWallet, disConnectWallet } = useConnectWallet();

  const doLogin = useCallback(async () => {
    try {
      const result = await connectWallet();
      console.log("connectWallet===", result);
    } catch (e) {
      console.error(e);
    } finally {
      //
    }
  }, [connectWallet]);

  return (
    <div className="flex gap-10">
      <button type="button" onClick={doLogin}>
        log in
      </button>
      <button type="button" onClick={disConnectWallet}>
        disConnect
      </button>
    </div>
  );
}
