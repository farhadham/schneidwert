import { db } from "@/database";
import {
  GETProjectProjectIdJobsJobIdParamType,
  GETProjectsProjectIdParamType,
  POSTProjectsJsonType,
  POSTProjectsProjectIdJobsJsonType,
  POSTProjectsProjectIdJobsParamType,
} from "./validators";
import { jobTable, projectTable } from "@/database/schema";
import { eq } from "drizzle-orm";

// TODO org specific
export const getAllProjects = async () => {
  return db.query.projectTable.findMany();
};

//TODO orgId should come from the user
export const createProject = async (
  orgId: string,
  payload: POSTProjectsJsonType,
) => {
  return db.insert(projectTable).values({
    orgId,
    ...payload,
  });
};

export const getProjectDetail = async (
  params: GETProjectsProjectIdParamType,
) => {
  return db.query.projectTable.findFirst({
    with: {
      jobs: true,
    },
    where: eq(projectTable.id, params.projectId),
  });
};

export const createJob = async (
  userId: string,
  params: POSTProjectsProjectIdJobsParamType,
  payload: POSTProjectsProjectIdJobsJsonType,
) => {
  return db.insert(jobTable).values({
    title: payload.title,
    calcVersion: "1",
    projectId: params.projectId,
    createdBy: userId,
    input: {},
    result: {},
  });
};

export const getJobDetail = async (
  params: GETProjectProjectIdJobsJobIdParamType,
) => {
  return db.query.jobTable.findFirst({
    where: eq(jobTable.id, params.jobId),
  });
};
