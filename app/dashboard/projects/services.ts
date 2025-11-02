import { handleRpcResponse, mainApiClient } from "@/lib/api";
import { projectQueryKeys } from "@/server/query-keys";
import { UseQueryOptions } from "@tanstack/react-query";

export const getProjectsService = mainApiClient.api.projects.$get;
export const getProjectsConfigs = () => {
  return {
    queryFn: () => handleRpcResponse(getProjectsService()),
    queryKey: projectQueryKeys.all,
    staleTime: Number.POSITIVE_INFINITY,
  } satisfies UseQueryOptions;
};
