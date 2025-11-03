"use client";

import { useApiQuery } from "@/hooks/use-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjectConfigs } from "./services";
import Link from "next/link";

type Props = {
  projectId: string;
};

export default function JobList({ projectId }: Props) {
  const { isPending, error, data } = useApiQuery(getProjectConfigs(projectId));

  if (isPending) return null;

  if (error) return null;

  return data.data.jobs.map((job) => (
    <Link key={job.id} href={`/dashboard/projects/${projectId}/jobs/${job.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>Customer: {job.customerName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>material: {job.material.name}</p>
          <p>thickness: {job.thickness.thicknessMm} mm</p>
          <p>Cut Length (mm): {job.cutLengthMm}</p>
          <p>Holes Count: {job.holesCount}</p>
          <p>Setup Min: {job.setupMin}</p>
          <p>Post Min: {job.postMin}</p>
          <p>Engrave Length (mm): {job.engraveLengthMm}</p>
          <p>Qty: {job.qty}</p>
          <p>Override Machine Eur Min: {job.overrideMachineEurMin}</p>
          <p>Margin Pct: {job.marginPct}</p>
          <p>Result Price Per Unit: {job.resultPricePerUnit}</p>
          <p>Result Total: {job.resultTotal}</p>
          <p>Customer Name: {job.customerName}</p>
          <p>Notes: {job.notes}</p>
        </CardContent>
      </Card>
    </Link>
  ));
}
