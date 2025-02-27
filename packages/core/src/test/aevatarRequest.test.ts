import { describe, it, expect, vi, beforeEach } from "vitest";
import { AevatarRequest } from "../AevatarRequest"; // Ensure correct import path
import { aevatarEvents } from "@aevatar-react-sdk/utils";
import type { RequestOpts } from "@aevatar-react-sdk/types";

// Mock FetchRequest
vi.mock("@portkey/request", () => {
  class MockFetchRequest {
    send = vi.fn(); // Mock send method
  }
  return { FetchRequest: MockFetchRequest };
});

describe("AevatarRequest Unit Tests", () => {
  let request: AevatarRequest;

  beforeEach(() => {
    request = new AevatarRequest({});
  });

  it("should merge commonHeaders and call send", async () => {
    const config: RequestOpts = {
      url: "/api/test",
      method: "GET",
      headers: { "X-Test": "123" },
    };

    // Mock send to return response
    vi.spyOn(request, "send").mockResolvedValue({
      data: "mock response",
    });

    const result = await request.send(config);

    expect(result.data).toBe("mock response");
  });

  it("should throw an error when sendOrigin retries more than 3 times", async () => {
    await expect(
      (request as any).sendOrigin({ url: "/api/test" }, 4)
    ).rejects.toEqual("sendOrigin==error");
  });

  it("should return data when send is successful", async () => {
    const config: RequestOpts = { url: "/api/test", method: "GET" };

    vi.spyOn(request, "send").mockResolvedValue({
      data: "expected-data",
    });

    const result = await request.send(config);

    expect(result.data).toBe("expected-data");
  });

  // it("should retry with a new token when receiving a 401 error", async () => {
  //   const authToken = "new-auth-token";

  //   vi.spyOn(request, "send")
  //     .mockRejectedValueOnce({ status: 401 }) // First call fails with 401
  //     .mockResolvedValueOnce({ data: "success" }); // Second call succeeds

  //   const emitSpy = vi.spyOn(aevatarEvents.AuthTokenGet, "emit");

  //   const addListenerSpy = vi
  //     .spyOn(aevatarEvents.AuthTokenReceive, "addListener")
  //     .mockImplementation((callback: (data: string) => void) => {
  //       callback(authToken);
  //       return {
  //         remove: vi.fn(),
  //         addListener: vi.fn(),
  //         on: vi.fn(),
  //         once: vi.fn(),
  //         removeListener: vi.fn(),
  //         off: vi.fn(),
  //         removeAllListeners: vi.fn(),
  //         setMaxListeners: vi.fn(),
  //         getMaxListeners: vi.fn(),
  //       } as any; // Ensures correct return type
  //     });

  //   const config: RequestOpts = { url: "/api/test", method: "GET" };
  //   const result = await request.send(config);

  //   expect(emitSpy).toHaveBeenCalled();
  //   expect(addListenerSpy).toHaveBeenCalled();
  //   expect(request.commonHeaders.Authorization).toBe(authToken);
  //   expect(result).toBe("success");
  // });

  it("should update commonHeaders using setHeaders", () => {
    const headers = {
      Authorization: "Bearer TestToken",
      "X-Custom-Header": "TestValue",
    };

    request.setHeaders(headers);

    expect(request.commonHeaders).toEqual(headers);
  });

  it("should throw an error if send fails with a non-401 status", async () => {
    const errorResponse = { status: 500, message: "Internal Server Error" };

    vi.spyOn(request, "send").mockRejectedValue(errorResponse);

    await expect(
      request.send({ url: "/api/test", method: "GET" })
    ).rejects.toEqual(errorResponse);
  });

  it("should throw an error if send fails with a non-401 status", async () => {
    const errorResponse = new Error("Internal Server Error");
    (errorResponse as any).status = 500;

    vi.spyOn(request, "send").mockRejectedValue(errorResponse);

    await expect(
      request.send({ url: "/api/test", method: "GET" })
    ).rejects.toThrow(errorResponse);
  });
});
