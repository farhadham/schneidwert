import { toast } from "sonner";

export const ERROR_TYPES = {
  NETWORK: "NetworkError",
  BACKEND: "BackendError",
  UNKNOWN: "UnknownError",
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong, please try again or contact support";
export const NETWORK_ERROR_MESSAGE = "Network error, please try again later";

export class AppError extends Error {
  public readonly status: number;
  public readonly data?: { [key: string]: unknown };
  public readonly originalError?: unknown;

  constructor({
    message,
    name,
    status,
    data,
    originalError,
  }: {
    name: ErrorType;
    message: string;
    status: number;
    data?: { [key: string]: unknown };
    originalError?: unknown;
  }) {
    super(message);

    this.name = name;
    this.status = status;
    this.data = data;
    this.originalError = originalError;
  }

  get isNetworkError(): boolean {
    return this.name === ERROR_TYPES.NETWORK;
  }

  get isBackendError(): boolean {
    return this.name === ERROR_TYPES.BACKEND;
  }

  get isUnknownError(): boolean {
    return this.name === ERROR_TYPES.UNKNOWN;
  }

  // Serialization for logging purposes
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      data: this.data,
      stack: this.stack,
    };
  }
}

export const handleQueryError = (error: unknown): AppError => {
  // Throw the original backend error
  if (error instanceof AppError) {
    return error;
  }

  // Handle network errors: CORS, Disconnect, ...
  if (error instanceof TypeError) {
    return new AppError({
      message: NETWORK_ERROR_MESSAGE,
      name: "NetworkError",
      status: 0,
      originalError: error,
    });
  }

  // Handle other unexpected errors
  return new AppError({
    message: DEFAULT_ERROR_MESSAGE,
    name: "UnknownError",
    status: 500,
    originalError: error,
  });
};

export function handleNetworkError(err: unknown) {
  if (err instanceof TypeError && err.message === "Failed to fetch") {
    toast.error(NETWORK_ERROR_MESSAGE);
    return true; // Indicates it was handled
  }
  return false; // Not an offline error
}
