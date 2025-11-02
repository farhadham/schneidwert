import { handleRpcResponse, mainApiClient } from "@/lib/api";
import { jobQueryKeys } from "@/server/query-keys";
import { UseQueryOptions } from "@tanstack/react-query";

export const getJobDetailService =
  mainApiClient.api.projects[":projectId"].jobs[":jobId"].$get;
export const getJobDetailConfigs = (projectId: string, jobId: string) => {
  return {
    queryFn: () =>
      handleRpcResponse(getJobDetailService({ param: { projectId, jobId } })),
    queryKey: jobQueryKeys.detail(jobId),
    staleTime: Number.POSITIVE_INFINITY,
  } satisfies UseQueryOptions;
};
