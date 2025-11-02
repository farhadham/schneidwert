import Details from "./details";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; jobId: string }>;
}) {
  const { jobId, projectId } = await params;

  return (
    <div>
      <Details jobId={jobId} projectId={projectId} />
    </div>
  );
}
