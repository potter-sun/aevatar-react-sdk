import { useCallback } from "react";
import { useAevatar } from "./index";

export function useWalletDispatch() {
  const [, { dispatch }] = useAevatar();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useCallback(dispatch, [dispatch]);
}
