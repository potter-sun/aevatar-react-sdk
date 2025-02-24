import { describe, it, expect, vi, beforeEach } from "vitest";
import type {
  IClientAuthTokenParams,
  RefreshTokenConfig,
  IConnectToken,
} from "../types/connect";
import queryString from "query-string";
import { Connect } from "../service";

describe("Connect Service", () => {
  let connectService: Connect;
  let mockRequest: { send: any };

  beforeEach(() => {
    mockRequest = {
      send: vi.fn(),
    };
    connectService = new Connect(mockRequest as any);
  });

  it("should get auth token with client correctly", async () => {
    const mockTokenResponse: IConnectToken = {
      access_token: "mockAccessToken",
      expires_in: 3600,
      token_type: "",
    };
    const clientAuthParams: IClientAuthTokenParams = {
      client_id: "mockClient",
      client_secret: "mockSecret",
      grant_type: "",
      scope: "",
    };

    mockRequest.send.mockResolvedValue(mockTokenResponse);

    const result = await connectService.getAuthTokenWithClient(
      clientAuthParams
    );

    expect(mockRequest.send).toHaveBeenCalledWith({
      method: "POST",
      url: "/connect/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryString.stringify(clientAuthParams),
    });

    expect(result).toEqual(mockTokenResponse);
  });

  it("should get connect token correctly", async () => {
    const mockTokenResponse: IConnectToken = {
      access_token: "mockAccessToken",
      expires_in: 3600,
      token_type: "",
    };
    const refreshTokenConfig: RefreshTokenConfig = {
      pubkey: "pubkey",
      signature: "signature",
      plain_text: "plain_text",
      source: "",
      client_id: "",
      grant_type: "",
    };

    mockRequest.send.mockResolvedValue(mockTokenResponse);

    const result = await connectService.getConnectToken(refreshTokenConfig);

    expect(mockRequest.send).toHaveBeenCalledWith({
      method: "POST",
      url: "/connect/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryString.stringify(refreshTokenConfig),
    });

    expect(result).toEqual(mockTokenResponse);
  });
});
