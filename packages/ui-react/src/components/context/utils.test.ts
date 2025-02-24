import { describe, it, expect } from "vitest";
import { basicActions } from "./utils";

describe("basicActions", () => {
  it("should create an action with type and payload", () => {
    const action = basicActions("ADD_ITEM", { id: 1, name: "Test Item" });

    expect(action).toEqual({
      type: "ADD_ITEM",
      payload: { id: 1, name: "Test Item" },
    });
  });

  it("should create an action with type and no payload", () => {
    const action = basicActions("REMOVE_ITEM");

    expect(action).toEqual({
      type: "REMOVE_ITEM",
      payload: undefined,
    });
  });

  it("should handle different types of payloads", () => {
    const action1 = basicActions("UPDATE_ITEM", {
      id: 1,
      name: "Updated Item",
    });
    const action2 = basicActions("TOGGLE_STATUS", true);
    const action3 = basicActions("SET_USER", {
      username: "testuser",
      email: "test@example.com",
    });

    expect(action1).toEqual({
      type: "UPDATE_ITEM",
      payload: { id: 1, name: "Updated Item" },
    });
    expect(action2).toEqual({
      type: "TOGGLE_STATUS",
      payload: true,
    });
    expect(action3).toEqual({
      type: "SET_USER",
      payload: { username: "testuser", email: "test@example.com" },
    });
  });
});
