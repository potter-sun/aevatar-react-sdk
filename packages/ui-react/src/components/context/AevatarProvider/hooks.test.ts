import { renderHook, act } from "@testing-library/react-hooks";
import { useAevatar } from "./index";
import { describe, expect, it, vi } from "vitest";
import { useWalletDispatch } from "./hooks";

vi.mock("./index", () => ({
  useAevatar: vi.fn(),
}));

describe("useWalletDispatch", () => {
  it("should return dispatch function", () => {
    const dispatchMock = vi.fn();

    // Mock useAevatar to return a mock dispatch function
    vi.mocked(useAevatar).mockReturnValue([{}, { dispatch: dispatchMock }]);

    const { result } = renderHook(() => useWalletDispatch());

    // Verify that the returned result is the same as the mock dispatch function
    expect(result.current).toBe(dispatchMock);
  });

  it("should call dispatch when invoked", () => {
    const dispatchMock = vi.fn();

    // Mock useAevatar to return a mock dispatch function
    vi.mocked(useAevatar).mockReturnValue([{}, { dispatch: dispatchMock }]);

    const { result } = renderHook(() => useWalletDispatch());

    // Call the dispatch function returned by the hook
    act(() => {
      return result.current({
        type: "SOME_ACTION",
        payload: undefined,
      });
    });

    // Verify that dispatch was called with the correct arguments
    expect(dispatchMock).toHaveBeenCalledWith({ type: "SOME_ACTION" });
  });
});
