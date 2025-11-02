import CreateJobButton from "./create-job-button";
import Details from "./details";
import JobList from "./job-list";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div className="space-y-6">
      <CreateJobButton projectId={projectId} />
      <Details projectId={projectId} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <JobList projectId={projectId} />
      </div>
    </div>
  );
}
