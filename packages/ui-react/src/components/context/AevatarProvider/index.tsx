import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { basicAevatarView, type AevatarState } from "./actions";
import { useEffectOnce } from "react-use";
import type { BasicActions } from "../utils";
import { aevatarAI } from "../../../utils";
import { ConfigProvider } from "../../config-provider";
import { Toaster } from "../../ui/toaster";
import { aevatarEvents } from "@aevatar-react-sdk/utils";

const INITIAL_STATE = {
  theme: "dark",
};
const AevatarContext = createContext<any>(INITIAL_STATE);

export function useAevatar(): [AevatarState, BasicActions] {
  const context = useContext(AevatarContext);
  return context;
}

function reducer(state: any, { type, payload }: any) {
  console.log(payload, type, "textContent====");
  switch (type) {
    case basicAevatarView.destroy.type: {
      return INITIAL_STATE;
    }
    default: {
      return Object.assign({}, state, payload);
    }
  }
}

export interface ProviderProps {
  // theme?: Theme;
  children: React.ReactNode;
}
export default function Provider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffectOnce(() => {
    if (aevatarAI.config.storageMethod) {
      ConfigProvider.setConfig({});
    }
  });

  useEffect(() => {
    aevatarEvents.AuthTokenGet.addListener(async () => {
      console.log(" aevatarEvents.AuthTokenGet.addListener===");
      const token = await ConfigProvider.config?.getAevatarAuthToken?.();
      aevatarEvents.AuthTokenReceive.emit(token);
    });
  }, []);

  // useEffect(() => {
  //   console.log("setGlobalConfig1", theme);
  //   theme && ConfigProvider.setTheme(theme);
  // }, [theme]);

  return (
    <AevatarContext.Provider
      value={useMemo(() => [{ ...state }, { dispatch }], [state])}>
      {children}
      <Toaster />
    </AevatarContext.Provider>
  );
}
