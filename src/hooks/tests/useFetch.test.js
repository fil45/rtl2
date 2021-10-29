import { act, renderHook } from "@testing-library/react-hooks";
import useFetch from "../useFetch";
import { users } from "../../testHelper";

const mockJson = Promise.resolve(users);
const mockFetch = Promise.resolve({ json: () => mockJson, ok: true });

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => mockFetch);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useFetch --->", () => {
  it("should fetch and refetch data", async () => {
    const { result } = renderHook(() => useFetch("http://testurl.com"));

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toEqual(true);
    expect(result.current.error).toEqual("");

    await act(() => mockJson);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(users);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual("");

    result.current.refetch();

    await act(() => mockJson);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("should save an error", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject("Server is not working"));
    const { result } = renderHook(() => useFetch("http://testurl.com"));

    expect(result.current.error).toEqual("");
    await act(() => mockFetch);
    expect(result.current.error).toEqual("Failed while getting data");
  });
});
