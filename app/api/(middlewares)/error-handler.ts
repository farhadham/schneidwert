/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { INTERNAL_ERROR_MESSAGE } from "@/data/constants";
import { ApiError } from "../(lib)/api-error";

import { DrizzleQueryError } from "drizzle-orm";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { HTTPResponseError } from "hono/types";

export const customOnError = (
  err: Error | HTTPResponseError,
  c: Context<any, any, {}>,
): Response => {
  // Log and response the errors we control
  if (err instanceof ApiError) {
    console.error({ ...err.toJSON(), user: c.get("user")?.email });
    return c.json(
      { error: err.message, success: false, data: err.data },
      err.status,
    );
  }

  // Drizzle errors
  if (err instanceof DrizzleQueryError) {
    console.error({
      query: err.query,
      params: err.params,
      message: err.message,
      cause: err.cause?.message,
      user: c.get("user")?.email,
    });

    if (
      err.query.toLowerCase().includes("insert into") &&
      err.cause &&
      err.cause.message.toLowerCase().includes("duplicate")
    ) {
      return c.json(
        {
          error:
            "This action has already been completed, Please refresh the page to see the result",
          success: false,
        },
        409,
      );
    }

    return c.json({ error: INTERNAL_ERROR_MESSAGE, success: false }, 500);
  }
  // -----------
  // Handle internal and library related errors
  // -----------

  // Log the error first
  console.error({ user: c.get("user")?.email, error: err });

  // Handling internal Hono errors
  if (err instanceof HTTPException) {
    if (err.status >= 500) {
      return c.json({ error: INTERNAL_ERROR_MESSAGE, success: false }, 500);
    }
    return c.json({ error: err.message, success: false }, err.status);
  }

  // Unknown error by server
  return c.json({ error: INTERNAL_ERROR_MESSAGE, success: false }, 500);
};
