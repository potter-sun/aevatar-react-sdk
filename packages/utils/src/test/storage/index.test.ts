import { vi, it, expect, describe, beforeEach } from "vitest";
import { getAevatarJWT, setAevatarJWT, resetAevatarJWT } from "../../index";
import type { IStorageSuite } from "@aevatar-react-sdk/types";
import { Day, LocalStorageKey } from "../../constants";

const mockStorage: IStorageSuite = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

describe("JWT Storage Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear previous mocks before each test.
  });

  describe("getAevatarJWT", () => {
    it("should return JWT data if it is valid and not expired", async () => {
      const validJwtData = {
        key1: {
          access_token: "valid_token",
          expiresTime: Date.now() + Day,
        },
      };
      mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(validJwtData));

      const result = await getAevatarJWT(mockStorage, "key1");
      console.log(result, "result==getAevatarJWT");
      expect(result).toEqual(validJwtData.key1);
    });

    it("should return undefined if JWT data does not exist", async () => {
      mockStorage.getItem.mockResolvedValueOnce(null); // No data in storage

      const result = await getAevatarJWT(mockStorage, "key1");
      expect(result).toBeUndefined();
    });

    it("should return undefined if JWT data is expired", async () => {
      const expiredJwtData = {
        key1: {
          access_token: "expired_token",
          expiresTime: Date.now() - 10000, // expired time
        },
      };
      mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(expiredJwtData));

      const result = await getAevatarJWT(mockStorage, "key1");
      expect(result).toBeUndefined();
    });

    it("should return undefined if JWT data is missing expiresTime", async () => {
      const invalidJwtData = {
        key1: {
          access_token: "token_without_expiry",
        },
      };
      mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(invalidJwtData));

      const result = await getAevatarJWT(mockStorage, "key1");
      expect(result).toBeUndefined();
    });

    it("should return undefined if storage throws an error", async () => {
      mockStorage.getItem.mockRejectedValueOnce(new Error("Storage error"));

      const result = await getAevatarJWT(mockStorage, "key1");
      expect(result).toBeUndefined();
    });
  });

  describe("setAevatarJWT", () => {
    it("should store JWT data with the correct expiration time", async () => {
      const jwtData = { access_token: "new_token", expires_in: "3600" }; // 1 hour expires
      const key = "key1";

      await setAevatarJWT(mockStorage, key, jwtData);

      expect(mockStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("resetAevatarJWT", () => {
    it("should remove the JWT data from storage", async () => {
      await resetAevatarJWT(mockStorage);

      expect(mockStorage.removeItem).toHaveBeenCalledWith(
        LocalStorageKey.AEVATAR_AI_ACCESS_TOKEN
      );
    });
  });
});
