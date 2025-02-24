import { describe, it, expect, vi, beforeEach } from "vitest";
import { AgentService, Services } from "../service";

describe("Services Class", () => {
  let mockRequest: { send: any };
  let services: Services;

  beforeEach(() => {
    mockRequest = {
      send: vi.fn(),
    };

    services = new Services(mockRequest as any);
  });

  it("should instantiate agent service correctly", () => {
    expect(services.agent).toBeInstanceOf(AgentService);
  });
});
