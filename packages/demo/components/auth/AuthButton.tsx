import { WalletTypeEnum } from "@aelf-web-login/wallet-adapter-base";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import AElf from "aelf-sdk";
import { useCallback } from "react";
import { recoverPubKeyBySignature } from "../../utils/aelf";
import { aevatarAI } from "@aevatar-react-sdk/ui-react";

const plainTextOrigin = `Hello and welcome! Click "Sign" to begin exploring the aevatar dashboard. Rest assured, this action won't trigger any blockchain transactions or incur gas fees.
Nonce: ${Date.now()}`;

export default function AuthButton() {
  const { walletInfo, walletType, getSignature } = useConnectWallet();
  console.log(walletInfo, "walletInfo==");
  const onGetAuthToken = useCallback(async () => {
    console.log(walletType, "walletType==");
    if (
      walletType === WalletTypeEnum.discover ||
      walletType === WalletTypeEnum.web
    ) {
      const plainText: any = Buffer.from(plainTextOrigin)
        .toString("hex")
        .replace("0x", "");
      let signResult: {
        error: number;
        errorMessage: string;
        signature: string;
        from: string;
      } | null;

      const discoverInfo = walletInfo?.extraInfo as any;
      if (
        (discoverInfo?.provider as any).methodCheck(
          "wallet_getManagerSignature"
        )
      ) {
        const sign = await discoverInfo?.provider?.request({
          method: "wallet_getManagerSignature",
          payload: { hexData: plainText },
        });
        const signR = sign.r.toString("hex", 32).padStart(64, "0");
        const signS = sign.s.toString("hex", 32).padStart(64, "0");
        const signRecoveryParam = sign.recoveryParam
          .toString()
          .padStart(2, "0");
        const signInfo = [signR, signS, signRecoveryParam].join("");

        signResult = {
          error: 0,
          errorMessage: "",
          signature: signInfo,
          from: WalletTypeEnum.discover,
        };
      } else {
        const signInfo = AElf.utils.sha256(plainText);
        signResult = await getSignature({
          appName: "APP_NAME",
          address: walletInfo?.address || "",
          signInfo,
        });
      }

      if (!signResult?.signature) throw "getSignature error";

      const pubkey = `${recoverPubKeyBySignature(
        plainText,
        signResult.signature
      )}`;
      console.log(pubkey, "pubkey==");

      const caHash = await (discoverInfo?.provider as any).request({
        method: "caHash",
      });
      console.log(caHash, "caHash==");
      const apiData = {
        pubkey,
        signature: signResult.signature,
        plain_text: plainText,
        ca_hash: caHash,
        chain_id: "tDVW",
        source: "portkey",
        client_id: "AevatarAuthServer",
        grant_type: "signature",
      };

      try {
        const result = await aevatarAI.getAuthToken(apiData);
        console.log(result, "getAuthToken===");
      } catch (error) {
        console.log(error, "getAuthToken==error=");
      }

      // getHomePageList
      // const result = await
    }
  }, [walletType, walletInfo, getSignature]);
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
