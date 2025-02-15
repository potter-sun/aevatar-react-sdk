import type React from "react";
import { createContext, useContext, useMemo, useReducer } from "react";
import { basicAevatarView, type AevatarState } from "./actions";
import { useEffectOnce } from "react-use";
import type { BasicActions } from "../utils";
import type { Theme } from "../../types";
import { aevatarAI } from "../../../utils";
import { ConfigProvider } from "../../config-provider";

const INITIAL_STATE = {
  theme: "dark",
};
const AevatarContext = createContext<any>(INITIAL_STATE);

export function useAevatar(): [AevatarState, BasicActions] {
  const context = useContext(AevatarContext);
  return context;
}

function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case basicAevatarView.destroy.type: {
      return {};
    }
    default: {
      const { destroy } = payload;
      if (destroy) return Object.assign({}, payload);
      return Object.assign({}, state, payload);
    }
  }
}

export interface ProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}
export default function Provider({ theme, children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  console.log("setGlobalConfig BaseConfigProvider=>Provider theme", theme);
  useEffectOnce(() => {
    if (aevatarAI.config.storageMethod) {
      ConfigProvider.setConfig({});
    }
  });

  // useEffect(() => {
  //   console.log("setGlobalConfig1", theme);
  //   theme && ConfigProvider.setTheme(theme);
  // }, [theme]);

  return (
    <AevatarContext.Provider
      value={useMemo(
        () => [{ ...state, theme }, { dispatch }],
        [state, theme]
      )}>
      {children}
    </AevatarContext.Provider>
  );
}
