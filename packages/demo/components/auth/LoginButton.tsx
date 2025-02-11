import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import React from "react";
import { useCallback } from "react";
import { navigate } from "vike/client/router";

export default function LoginButton() {
  const { connectWallet } = useConnectWallet();

  const doLogin = useCallback(async () => {
    try {
      const result = await connectWallet();
      console.log("connectWallet===", result);

      await navigate("/auth/atomic");
    } catch (e) {
      console.error(e);
    } finally {
      //
    }
  }, [connectWallet]);

  return (
    <button className="w-full" onClick={doLogin}>
      log in
    </button>
  );
}
