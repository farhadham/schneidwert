import { INTERNAL_ERROR_MESSAGE } from "@/data/constants";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export class ApiError extends Error {
  public readonly status: ContentfulStatusCode;
  public readonly data?: unknown;
  public readonly originalError?: unknown;

  constructor({
    message,
    status,
    data,
    originalError,
  }: {
    message?: string;
    status?: ContentfulStatusCode;
    data?: { [key: string]: unknown };
    originalError?: unknown;
  }) {
    super(message ?? INTERNAL_ERROR_MESSAGE);

    this.name = "ApiError";
    this.status = status ?? 500;
    this.data = data;
    this.originalError = originalError;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  // Serialization for logging purposes
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      data: this.data,
      stack: this.status >= 500 ? this.stack : undefined,
    };
  }
}
