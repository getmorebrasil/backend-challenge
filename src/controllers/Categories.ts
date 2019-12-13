import { FastifyRequest, FastifyReply, RequestHandler } from "fastify";
import { ServerResponse } from "http";

import services from "../services";

class Categories {
    test: RequestHandler;

    async routeCategoriesPost(
        req: FastifyRequest,
        res: FastifyReply<ServerResponse>,
    ): Promise<void> {
        // @ts-ignore
        if (!req.body || req.validation) {
            res.status(400).send({
                ok: "false",
                error: "InvalidBody",
            });
        } else {
            try {
                // Call Use-Case
                await services.CategoriesService.createCategory({
                    id: req.body.id,
                    name: req.body.name,
                    childrenIds: req.body.childrenIds,
                });

                // Send Success
                res.status(200).send({
                    ok: true,
                });
            } catch (e) {
                // Notify Error
                res.status(500).send({
                    ok: false,
                    error: e.message,
                });
            }
        }
    }
}

export default new Categories();
