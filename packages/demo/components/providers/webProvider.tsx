import { WebLoginProvider } from "@aelf-web-login/wallet-adapter-react";
import { walletConnectConfig } from "../config/walletConnect";
import React from "react";

const WebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebLoginProvider config={walletConnectConfig}>{children}</WebLoginProvider>
  );
};

export default WebProvider;
