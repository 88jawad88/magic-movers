import { Router } from "express";
import { container } from "tsyringe";
import { MagicMoverController } from "../controllers/MagicMoverController";

const router = Router();
const magicMoverController = container.resolve(MagicMoverController);

/**
 * Route to add a new Magic Mover.
 * @route POST /api/magic-movers/add
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.post('/add', (req, res) => magicMoverController.addMagicMover(req, res));

/**
 * Route to load a Magic Item into a Magic Mover.
 * @route POST /api/magic-movers/load
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.post('/load', (req, res) => magicMoverController.loadMagicMover(req, res));

/**
 * Route to start a mission for a Magic Mover.
 * @route POST /api/magic-movers/start-mission
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.post('/start', (req, res) => magicMoverController.startMission(req, res));

/**
 * Route to end a mission for a Magic Mover.
 * @route POST /api/magic-movers/end-mission
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.post('/end', (req, res) => magicMoverController.endMission(req, res));

/**
 * Route to get the top Magic Movers.
 * @route GET /api/magic-movers/top
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
router.get('/top', (req, res) => magicMoverController.getTopMovers(req, res));

export default router;
