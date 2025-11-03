import { Hono } from "hono";
import { AuthenticationMiddlewareVariables } from "../../(middlewares)/auth";
import { getAllMaterials, getThicknessesByMaterialId } from "./services";
import { zValidator } from "../../(lib)/utils";
import { GETMaterialsMaterialIdParamSchema } from "./validators";

const materialsRoutes = new Hono<{
  Variables: AuthenticationMiddlewareVariables;
}>()
  .get("/", async (c) => {
    const materials = await getAllMaterials();

    return c.json(
      {
        success: true,
        data: materials,
      },
      201,
    );
  })

  .get(
    "/:materialId/thickness",
    zValidator("param", GETMaterialsMaterialIdParamSchema),
    async (c) => {
      const params = c.req.valid("param");
      const thicknesses = await getThicknessesByMaterialId(params);

      return c.json(
        {
          success: true,
          data: thicknesses,
        },
        201,
      );
    },
  );
export default materialsRoutes;
