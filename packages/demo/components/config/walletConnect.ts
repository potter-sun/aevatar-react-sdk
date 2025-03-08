import { SignInDesignEnum } from "@aelf-web-login/wallet-adapter-base";
import type { IConfigProps } from "@aelf-web-login/wallet-adapter-bridge";
import { NightElfWallet } from "@aelf-web-login/wallet-adapter-night-elf";
import { PortkeyDiscoverWallet } from "@aelf-web-login/wallet-adapter-portkey-discover";
import { PortkeyInnerWallet } from "@aelf-web-login/wallet-adapter-portkey-web";
import { ChainConfig, IS_MAINNET } from "./chain";
import { PORTKEY_CONFIG } from "./portkey";

export const APP_NAME = "admin.aevatar.ai";
const CHAIN_ID = ChainConfig.chainId;
const RPC_SERVER_AELF = ChainConfig.mainChainRpcUrl;
const RPC_SERVER_TDVV = ChainConfig.sideChainRpcUrl;
const RPC_SERVER_TDVW = ChainConfig.sideChainRpcUrl;

const { NETWORK_TYPE } = PORTKEY_CONFIG;

const baseConfig: IConfigProps["baseConfig"] = {
  omitTelegramScript: true,
  enableAcceleration: true,
  networkType: NETWORK_TYPE,
  chainId: CHAIN_ID,
  sideChainId: ChainConfig.sideChainId,
  showVconsole: !IS_MAINNET,
  design: SignInDesignEnum.CryptoDesign,
  theme: "dark",
  appName: "ai-dashboard",
};

const wallets = [
  new PortkeyInnerWallet({ networkType: NETWORK_TYPE, chainId: CHAIN_ID }),
  new PortkeyDiscoverWallet({
    networkType: NETWORK_TYPE,
    chainId: CHAIN_ID,
    autoRequestAccount: true, // If set to true, please contact Portkey to add whitelist @Rachel
    autoLogoutOnDisconnected: true,
    autoLogoutOnNetworkMismatch: true,
    autoLogoutOnAccountMismatch: true,
    autoLogoutOnChainMismatch: true,
  }),
  new NightElfWallet({
    chainId: CHAIN_ID,
    appName: APP_NAME,
    connectEagerly: true,
    defaultRpcUrl: RPC_SERVER_AELF,
    nodes: {
      AELF: {
        chainId: "AELF",
        rpcUrl: RPC_SERVER_AELF,
      },
      tDVW: {
        chainId: "tDVW",
        rpcUrl: RPC_SERVER_TDVW,
      },
      tDVV: {
        chainId: "tDVV",
        rpcUrl: RPC_SERVER_TDVV,
      },
    },
  }),
];
// https://aelfblockchain.sg.larksuite.com/record/ZiTBrhUMjefNbYclXCClXlq0g2c?lang=en-US&open_in_browser=true&ccm_open_type=record_message
export const tempMobileWalletConfig = wallets.filter(
  (x) => !["NightElf"].includes(x.name)
);
export const telegramWalletConfig = wallets.filter(
  (x) => !["PortkeyDiscover", "NightElf"].includes(x.name)
);

export const walletConnectConfig: IConfigProps = {
  baseConfig,
  wallets,
};
