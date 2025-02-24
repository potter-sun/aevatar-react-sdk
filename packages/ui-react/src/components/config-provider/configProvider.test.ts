import { vi, expect, it, describe, beforeEach } from "vitest";
import { aevatarAI } from "../../utils";
import { BaseAsyncStorage } from "../../utils/asyncStorage";
import { ConfigProviderInstance } from "./configProvider";
import type { IStorageSuite } from "@aevatar-react-sdk/types";
// Mock the aevatarAI and BaseAsyncStorage
vi.mock("../../utils", () => ({
  aevatarAI: {
    setConfig: vi.fn(),
  },
}));

vi.mock("../../utils/asyncStorage", () => ({
  BaseAsyncStorage: vi.fn().mockImplementation(() => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
  })),
}));

const storageConfig = new BaseAsyncStorage();

describe("ConfigProviderInstance", () => {
  let configProvider: ConfigProviderInstance;

  beforeEach(() => {
    configProvider = new ConfigProviderInstance({});
    vi.clearAllMocks();
  });

  it("should set storageMethod when storageMethod is passed", () => {
    configProvider.setConfig({ storageMethod: storageConfig });

    expect(aevatarAI.setConfig).toHaveBeenCalledWith({
      storageMethod: storageConfig,
    });
  });

  it("should set default storageMethod if not passed", () => {
    configProvider.setConfig({});

    expect(aevatarAI.setConfig).toHaveBeenCalled();
  });

  it("should update requestDefaults correctly", () => {
    const mockRequestDefaults = {
      headers: { "Content-Type": "application/json" },
    };

    configProvider.setConfig({ requestDefaults: mockRequestDefaults });

    expect(aevatarAI.setConfig).toHaveBeenCalledWith({
      requestDefaults: mockRequestDefaults,
    });
  });

  it("should set graphQLUrl correctly", () => {
    const mockGraphQLUrl = "https://graphql.example.com";

    configProvider.setConfig({ graphQLUrl: mockGraphQLUrl });

    expect(aevatarAI.setConfig).toHaveBeenCalledWith({
      graphQLUrl: mockGraphQLUrl,
    });
  });

  it("should set connectUrl correctly", () => {
    const mockConnectUrl = "https://connect.example.com";

    configProvider.setConfig({ connectUrl: mockConnectUrl });

    expect(aevatarAI.setConfig).toHaveBeenCalledWith({
      connectUrl: mockConnectUrl,
    });
  });

  it("should update config state with the new values", () => {
    const mockConfig = {
      storageMethod: storageConfig,
      requestDefaults: { headers: { "Content-Type": "application/json" } },
      graphQLUrl: "https://graphql.example.com",
      connectUrl: "https://connect.example.com",
    };

    configProvider.setConfig(mockConfig);

    expect(configProvider.config).toEqual(expect.objectContaining(mockConfig));
  });
});
