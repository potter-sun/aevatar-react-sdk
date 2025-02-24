import { describe, it, expect, vi, beforeEach } from "vitest";
import { BaseAsyncStorage } from "./asyncStorage";

describe("BaseAsyncStorage", () => {
  beforeEach(() => {
    // Mocking the localStorage methods
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    } as unknown as Storage;
  });

  it("should call localStorage.getItem with the correct key", async () => {
    const storage = new BaseAsyncStorage();
    const key = "testKey";
    const mockValue = "testValue";

    // Mocking the getItem method to return a value
    vi.mocked(global.localStorage.getItem).mockResolvedValue(mockValue);

    const result = await storage.getItem(key);

    expect(global.localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBe(mockValue);
  });

  it("should call localStorage.setItem with the correct key and value", async () => {
    const storage = new BaseAsyncStorage();
    const key = "testKey";
    const value = "testValue";

    await storage.setItem(key, value);

    expect(global.localStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it("should call localStorage.removeItem with the correct key", async () => {
    const storage = new BaseAsyncStorage();
    const key = "testKey";

    await storage.removeItem(key);

    expect(global.localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it("should not throw an error if localStorage is undefined", async () => {
    // Simulate a non-browser environment where `localStorage` is undefined
    global.localStorage = undefined as unknown as Storage;

    const storage = new BaseAsyncStorage();

    // These methods should not throw errors even if localStorage is unavailable
    await expect(storage.getItem("testKey")).resolves.not.toThrow();
    await expect(
      storage.setItem("testKey", "testValue")
    ).resolves.not.toThrow();
    await expect(storage.removeItem("testKey")).resolves.not.toThrow();
  });
});
