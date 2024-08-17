import { Router } from "express";
import { container } from "tsyringe";
import { MagicItemController } from "../controllers/MagicItemController";

const router = Router();
const magicItemController = container.resolve(MagicItemController);

/**
 * Route to add a new Magic Item.
 * @route POST /api/magic-items/add
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.post('/add', (req, res) => magicItemController.addMagicItem(req, res));

export default router;
