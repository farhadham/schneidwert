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
          <CardDescription>created by: {job.createdBy}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>input: {JSON.stringify(job.input)}</p>
          <p>result: {JSON.stringify(job.result)}</p>
        </CardContent>
      </Card>
    </Link>
  ));
}
