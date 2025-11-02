"use client";

import { useApiQuery } from "@/hooks/use-api";
import { getProjectConfigs } from "./services";
import { Spinner } from "@/components/ui/spinner";
import ErrorAlert from "@/components/common/error-alert";

type Props = {
  projectId: string;
};

export default function Details({ projectId }: Props) {
  const { isPending, error, data } = useApiQuery(getProjectConfigs(projectId));

  if (isPending) return <Spinner />;

  if (error) return <ErrorAlert>{error.message}</ErrorAlert>;

  return (
    <div>
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
        name: {data.data.name}
      </p>
    </div>
  );
}
