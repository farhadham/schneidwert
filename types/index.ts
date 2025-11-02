// Error message sent by the RPC endpoint
export type APIErrorResponseType = {
  error: string;
  success: false;
  data?: { [key: string]: unknown };
};
