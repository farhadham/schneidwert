import { Hono } from "hono";
import { AuthenticationMiddlewareVariables } from "@api/(middlewares)/auth";
import { zValidator } from "../../(lib)/utils";
import {
  GETProjectProjectIdJobsJobIdParamSchema,
  GETProjectsProjectIdParamSchema,
  POSTProjectsJsonSchema,
  POSTProjectsProjectIdJobsJsonSchema,
} from "./validators";
import {
  createJob,
  createProject,
  getAllProjects,
  getJobDetail,
  getProjectDetail,
} from "./services";
import { ApiError } from "../../(lib)/api-error";

const projectsRoutes = new Hono<{
  Variables: AuthenticationMiddlewareVariables;
}>()

  .get("/", async (c) => {
    const projects = await getAllProjects();

    return c.json(
      {
        success: true,
        data: projects,
      },
      201,
    );
  })

  .post("/", zValidator("json", POSTProjectsJsonSchema), async (c) => {
    await createProject(
      "11111111-1111-1111-1111-111111111111",
      c.req.valid("json"),
    ); //TODO orgId should come from the user

    return c.json(
      {
        success: true,
      },
      201,
    );
  })

  .get(
    "/:projectId",
    zValidator("param", GETProjectsProjectIdParamSchema),
    async (c) => {
      const project = await getProjectDetail(c.req.valid("param"));

      if (!project) {
        throw new ApiError({ message: "Project is not found", status: 404 });
      }

      return c.json(
        {
          success: true,
          data: project,
        },
        201,
      );
    },
  )

  .post(
    "/:projectId/jobs",
    zValidator("param", GETProjectsProjectIdParamSchema),
    zValidator("json", POSTProjectsProjectIdJobsJsonSchema),
    async (c) => {
      await createJob(
        c.get("user").id,
        c.req.valid("param"),
        c.req.valid("json"),
      );

      return c.json(
        {
          success: true,
        },
        201,
      );
    },
  )

  .get(
    "/:projectId/jobs/:jobId",
    zValidator("param", GETProjectProjectIdJobsJobIdParamSchema),
    async (c) => {
      const job = await getJobDetail(c.req.valid("param"));

      if (!job) {
        throw new ApiError({ message: "job is not found", status: 404 });
      }

      return c.json(
        {
          success: true,
          data: job,
        },
        200,
      );
    },
  );

export default projectsRoutes;
