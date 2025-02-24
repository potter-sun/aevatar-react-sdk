import { describe, it, expect, vi } from "vitest";
import { basicActions } from "../utils"; 
import type { Theme } from "../../types";
import { AevatarActions, basicAevatarView } from "./actions";

describe("basicAevatarView", () => {
  it("should create an action for setTheme with the correct type and payload", () => {
    const theme: Theme = "dark";
    const action = basicAevatarView.setTheme.actions(theme);

    expect(action).toEqual({
      type: AevatarActions.setTheme,
      payload: { theme },
    });
  });

  it("should create an action for destroy with the correct type and no payload", () => {
    const action = basicAevatarView.destroy.actions();

    expect(action).toEqual({
      type: AevatarActions.destroy,
      payload: undefined,
    });
  });
});
