import { Hono } from "hono";
import { handle } from "hono/vercel";
import { customOnError } from "@api/(middlewares)/error-handler";
import { authenticationMiddleware } from "@api/(middlewares)/auth";
import usersRoutes from "../(routes)/users";
import projectsRoutes from "../(routes)/projects";
import materialsRoutes from "../(routes)/materials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

// Protecting all routes after this
app.use(authenticationMiddleware);

const routes = app
  .route("/users", usersRoutes)
  .route("/projects", projectsRoutes)
  .route("/materials", materialsRoutes);

app.onError(customOnError);

export const GET = handle(app);
export const POST = handle(app);

export type ApiType = typeof routes;
