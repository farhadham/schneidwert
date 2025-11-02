import { ApiType } from "@/app/api/[...route]/route";
import type { APIErrorResponseType } from "../types";
import { AppError, handleQueryError } from "./error-handler";

import { hc, type ClientResponse } from "hono/client";

export const mainApiClient = hc<ApiType>("/");

export const handleRpcResponse = async <T>(
  requestPromise: Promise<ClientResponse<T>>,
): Promise<T> => {
  try {
    const res = await requestPromise;

    if (!res.ok) {
      const errorData = (await res.json()) as APIErrorResponseType;
      throw new AppError({
        message: errorData.error,
        name: "BackendError",
        status: res.status,
        data: errorData.data,
      });
    }

    return res.json() as T;
  } catch (error) {
    throw handleQueryError(error);
  }
};
