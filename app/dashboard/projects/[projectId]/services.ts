import { handleRpcResponse, mainApiClient } from "@/lib/api";
import { projectQueryKeys } from "@/server/query-keys";
import { UseQueryOptions } from "@tanstack/react-query";

export const getProjectService = mainApiClient.api.projects[":projectId"].$get;
export const getProjectConfigs = (projectId: string) => {
  return {
    queryFn: () =>
      handleRpcResponse(getProjectService({ param: { projectId } })),
    queryKey: projectQueryKeys.detail(projectId),
    staleTime: Number.POSITIVE_INFINITY,
  } satisfies UseQueryOptions;
};
