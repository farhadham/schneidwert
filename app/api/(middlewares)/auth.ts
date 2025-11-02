import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";

export type AuthenticationMiddlewareVariables = {
  user: typeof auth.$Infer.Session.user;
  session: typeof auth.$Infer.Session.session;
};

export const authenticationMiddleware = createMiddleware<{
  Variables: AuthenticationMiddlewareVariables;
}>(async (c, next) => {
  // Getting session from better-auth by passing headers of request
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json(
      {
        error: "You are not authenticated, please try logging in",
        success: false,
      },
      401,
    );
  }

  // Attach details to be used in other middlewares
  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});
