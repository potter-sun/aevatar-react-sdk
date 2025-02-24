import type { Theme } from "../../types";
import { basicActions } from "../utils";

export const AevatarActions = {
  setTheme: "SET_THEME",
  destroy: "DESTROY",
};

export type AevatarState = {
  theme?: Theme;
};

export const basicAevatarView = {
  setTheme: {
    type: AevatarActions.setTheme,
    actions: (theme: Theme) =>
      basicActions(AevatarActions.setTheme, {
        theme,
      }),
  },
  destroy: {
    type: AevatarActions.destroy,
    actions: () => basicActions(AevatarActions.destroy),
  },
};
