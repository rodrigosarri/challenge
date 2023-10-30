import { Router } from "express";
import MessageController from "../controllers/messageController";

const router = Router();

router.post("/messages", MessageController.create);
router.get("/messages", MessageController.getAll);
router.get("/messages/:uuid", MessageController.getById);
router.put("/messages/:uuid", MessageController.update);
router.delete("/messages/:uuid", MessageController.delete);

export default router;
