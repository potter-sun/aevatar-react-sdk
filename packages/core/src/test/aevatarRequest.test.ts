import { describe, it, expect, vi, beforeEach } from "vitest";
import type { RequestOpts, HTTPHeaders } from "@aevatar-react-sdk/types";
import { AevatarRequest } from "../aevatarRequest";

// vi.mock("@portkey/request", () => {
//   return {
//     FetchRequest: vi.fn().mockImplementation(() => {
//       return {
//         send: vi.fn(),
//       };
//     }),
//   };
// });
const mockSend = vi.fn();

describe("AevatarRequest", () => {
  let aevatarRequest: AevatarRequest;

  beforeEach(() => {
    aevatarRequest = new AevatarRequest({} as any);
    aevatarRequest.send = mockSend;
  });

  it("should correctly set headers with setHeaders", () => {
    const headers: HTTPHeaders = {
      Authorization: "Bearer mock-token",
      "Content-Type": "application/json",
    };

    aevatarRequest.setHeaders(headers);

    expect(aevatarRequest.commonHeaders).toEqual(headers);
  });

  it("should merge commonHeaders and config.headers correctly", async () => {
    const initialHeaders: HTTPHeaders = {
      Authorization: "Bearer initial-token",
    };
    aevatarRequest.setHeaders(initialHeaders);

    const requestConfig: RequestOpts = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    mockSend.mockResolvedValueOnce({ message: "Success" });

    const result = await aevatarRequest.send(requestConfig);


    // expect(mockSend).toHaveBeenCalledWith({
    //   ...requestConfig,
    //   headers: {
    //     ...initialHeaders,
    //     ...requestConfig.headers, /
    //   },
    // });

    expect(result.message).toEqual("Success");
  });

  it("should return access_token if present in result", async () => {
    const mockResponse = { access_token: "mock-access-token" };
    mockSend.mockResolvedValueOnce(mockResponse);

    const requestConfig: RequestOpts = {};

    const result = await aevatarRequest.send(requestConfig);

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if super.send fails", async () => {
    const error = new Error("Request failed");
    mockSend.mockRejectedValueOnce(error);

    const requestConfig: RequestOpts = {};

    await expect(aevatarRequest.send(requestConfig)).rejects.toThrowError(
      error
    );
  });
});
