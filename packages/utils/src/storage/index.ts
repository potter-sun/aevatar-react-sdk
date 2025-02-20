import { Day, LocalStorageKey } from "../constants";
import type { IStorageSuite, TAevatarJWTData } from "@aevatar-react-sdk/types";

export const getAevatarJWT = async (storage: IStorageSuite, key: string) => {
  try {
    const jwtData = await storage.getItem(
      LocalStorageKey.AEVATAR_AI_ACCESS_TOKEN
    );
    if (!jwtData) return;
    const data = JSON.parse(jwtData) as { [key: string]: TAevatarJWTData };
    const cData = data[key];
    if (!cData || !cData?.expiresTime) return;
    if (Date.now() + 0.5 * Day > cData?.expiresTime) return;
    return cData;
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  } catch (error) {
    return;
  }
};

export const resetAevatarJWT = (storage: IStorageSuite) => {
  return storage.removeItem(LocalStorageKey.AEVATAR_AI_ACCESS_TOKEN);
};

export const setAevatarJWT = (
  storage: IStorageSuite,
  key: string,
  data: TAevatarJWTData
) => {
  const jwtData: TAevatarJWTData = {
    ...data,
    expiresTime: Date.now() + (Number(data.expires_in) - 20),
  };
  return storage.setItem(
    LocalStorageKey.AEVATAR_AI_ACCESS_TOKEN,
    JSON.stringify({ [key]: jwtData })
  );
};
