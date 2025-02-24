import { describe, it, expect, vi } from "vitest";
import { AevatarConfig, RequestDefaultsConfig, StorageConfig } from "../config";
import type {
  IConfig,
  IRequestDefaults,
  IStorageSuite,
} from "@aevatar-react-sdk/types";

describe("StorageConfig", () => {
  it("should throw an error if storage is not set and getItem is called", async () => {
    const storageConfig = new StorageConfig();
    await expect(storageConfig.getItem("key")).rejects.toThrow(
      "Please set storage first"
    );
  });

  it("should throw an error if storage is not set and setItem is called", async () => {
    const storageConfig = new StorageConfig();
    await expect(storageConfig.setItem("key", "value")).rejects.toThrow(
      "Please set storage first"
    );
  });

  it("should throw an error if storage is not set and removeItem is called", async () => {
    const storageConfig = new StorageConfig();
    await expect(storageConfig.removeItem("key")).rejects.toThrow(
      "Please set storage first"
    );
  });

  it("should call setStorage and work with storage", async () => {
    const mockStorage: IStorageSuite = {
      getItem: vi.fn().mockResolvedValue("value"),
      setItem: vi.fn().mockResolvedValue(undefined),
      removeItem: vi.fn().mockResolvedValue(undefined),
    };

    const storageConfig = new StorageConfig();
    storageConfig.setStorage(mockStorage);

    await storageConfig.setItem("key", "value");
    await storageConfig.getItem("key");
    await storageConfig.removeItem("key");

    expect(mockStorage.setItem).toHaveBeenCalledWith("key", "value");
    expect(mockStorage.getItem).toHaveBeenCalledWith("key");
    expect(mockStorage.removeItem).toHaveBeenCalledWith("key");
  });
});

// RequestDefaultsConfig

describe("RequestDefaultsConfig", () => {
  it("should initialize with an empty config", () => {
    const requestDefaultsConfig = new RequestDefaultsConfig();
    expect(requestDefaultsConfig).toMatchObject({
      headers: undefined,
      baseURL: undefined,
      url: undefined,
      method: undefined,
      timeout: undefined,
      connectUrl: undefined,
    });
  });

  it("should set config correctly using setConfig method", () => {
    const config: IRequestDefaults = {
      headers: { "Content-Type": "application/json" },
      baseURL: "http://example.com",
      method: "GET",
      timeout: 5000,
    };

    const requestDefaultsConfig = new RequestDefaultsConfig();
    requestDefaultsConfig.setConfig(config);

    expect(requestDefaultsConfig).toMatchObject(config);
  });
});

// AevatarConfig

describe("AevatarConfig", () => {
  it("should initialize with default values", () => {
    const config = new AevatarConfig();
    expect(config).toHaveProperty("storageMethod");
    expect(config.storageMethod).toBeInstanceOf(StorageConfig);
    expect(config.requestConfig).toBeInstanceOf(RequestDefaultsConfig);
    expect(config.connectRequestConfig).toBeInstanceOf(RequestDefaultsConfig);
  });

  it("should set config correctly", () => {
    const requestDefaults: IRequestDefaults = {
      headers: { "Content-Type": "application/json" },
      baseURL: "http://example.com",
      method: "GET",
      timeout: 5000,
    };

    const storageMethod = new StorageConfig();
    const config: IConfig = {
      storageMethod,
      requestDefaults,
      connectUrl: "http://connect.com",
    };

    const aevatarConfig = new AevatarConfig(config);

    // Verify that the request defaults are set
    expect(aevatarConfig.requestDefaults).toEqual(requestDefaults);
    expect(aevatarConfig.connectRequestConfig.baseURL).toEqual(
      "http://connect.com"
    );
    expect(aevatarConfig.connectRequestConfig.method).toBe(
      requestDefaults.method
    );
    expect(aevatarConfig.connectRequestConfig.timeout).toBe(
      requestDefaults.timeout
    );

    // Verify storage method
    expect(aevatarConfig.storageMethod).toHaveProperty("getItem");
  });

  it("should correctly handle storage configuration in setConfig method", () => {
    const mockStorage = vi.fn();
    const storageMethod = new StorageConfig(mockStorage as any);

    const aevatarConfig = new AevatarConfig({
      storageMethod,
      requestDefaults: {
        headers: { "Content-Type": "application/json" },
        baseURL: "http://example.com",
      },
    });

    aevatarConfig.setConfig({ storageMethod });
    aevatarConfig.setConfig({ graphQLUrl: "http://example.com" });

    expect(aevatarConfig.storageMethod).toHaveProperty("getItem");
    expect(aevatarConfig.graphQLUrl).toEqual("http://example.com");
    aevatarConfig.setConfig({ graphQLUrl: undefined });
  });

  it("should correctly handle storage configuration in setConfig method when  requestDefaults does not exist", () => {
    const aevatarConfig = new AevatarConfig({
      connectUrl: "http://connect.com",
    });

    expect(aevatarConfig.connectRequestConfig).toHaveProperty("baseURL");
  });
});
