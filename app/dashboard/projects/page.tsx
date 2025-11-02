"use client";

import CreateProjectButton from "./create-project-button";
import ProjectList from "./project-list";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <CreateProjectButton />
      </div>
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
        List of projects
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProjectList />
      </div>
    </div>
  );
}
