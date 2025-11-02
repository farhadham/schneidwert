"use client";

import { useApiQuery } from "@/hooks/use-api";
import { Spinner } from "@/components/ui/spinner";
import ErrorAlert from "@/components/common/error-alert";
import { getJobDetailConfigs } from "./services";

type Props = {
  projectId: string;
  jobId: string;
};

export default function Details({ projectId, jobId }: Props) {
  const { isPending, error, data } = useApiQuery(
    getJobDetailConfigs(projectId, jobId),
  );

  if (isPending) return <Spinner />;

  if (error) return <ErrorAlert>{error.message}</ErrorAlert>;

  return (
    <div>
      <p>{data.data.title}</p>
      <p>{data.data.createdBy}</p>
      <p>{data.data.createdAt}</p>
      <p>{JSON.stringify(data.data.input)}</p>
      <p>{JSON.stringify(data.data.result)}</p>
    </div>
  );
}
