import { useApiQuery } from "@/hooks/use-api";
import { getProjectsConfigs } from "./services";
import { Spinner } from "@/components/ui/spinner";
import ErrorAlert from "@/components/common/error-alert";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ProjectList() {
  const { isPending, error, data } = useApiQuery(getProjectsConfigs());

  if (isPending) return <Spinner />;

  if (error) return <ErrorAlert>{error.message}</ErrorAlert>;

  return data.data.map((project) => (
    <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  ));
}
