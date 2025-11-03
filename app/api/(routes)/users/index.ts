import { Hono } from "hono";
import { AuthenticationMiddlewareVariables } from "@api/(middlewares)/auth";
import { getMyCompleteProfile } from "./services";

const usersRoutes = new Hono<{
  Variables: AuthenticationMiddlewareVariables;
}>().get("/me", async (c) => {
  const authUser = c.get("user");

  const profile = await getMyCompleteProfile(authUser.id);

  return c.json(
    {
      success: true,
      data: profile,
    },
    200,
  );
});

export default usersRoutes;
