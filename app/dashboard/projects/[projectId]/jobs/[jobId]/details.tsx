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
    <div className="space-y-2">
      <p>{data.data.title}</p>
      <p>material: {data.data.material.name}</p>
      <p>thickness: {data.data.thickness.thicknessMm} mm</p>
      <p>Cut Length (mm): {data.data.cutLengthMm}</p>
      <p>Holes Count: {data.data.holesCount}</p>
      <p>Setup Min: {data.data.setupMin}</p>
      <p>Post Min: {data.data.postMin}</p>
      <p>Engrave Length (mm): {data.data.engraveLengthMm}</p>
      <p>Qty: {data.data.qty}</p>
      <p>Override Machine Eur Min: {data.data.overrideMachineEurMin}</p>
      <p>Margin Pct: {data.data.marginPct}</p>
      <p>Result Price Per Unit: {data.data.resultPricePerUnit}</p>
      <p>Result Total: {data.data.resultTotal}</p>
      <p>Customer Name: {data.data.customerName}</p>
      <p>Notes: {data.data.notes}</p>
    </div>
  );
}
