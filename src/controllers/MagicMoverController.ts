import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { MagicMoverService } from "../services/MagicMoverService";
import { validateMagicMover } from "../utils/validation";

@injectable()
export class MagicMoverController {
  constructor(
    @inject(MagicMoverService) private magicMoverService: MagicMoverService
  ) {}

  /**
   * Add a new Magic Mover.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns - status
   */
  async addMagicMover(req: Request, res: Response) {
    const { error } = validateMagicMover(req.body);
    if (error) res.status(400).send(error.details[0].message);
    try {
      const magicMover = await this.magicMoverService.addMagicMover(req.body);
      res.send(magicMover);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "MongoError" && (err as any).code === 11000) {
          // Duplicate key error
          res.send("duplicated name of Magic Mover");
        }
        res.status(400).send("Magic Mover with this name already exists");
      }
    }
  }

  /**
   * Load a Magic Item into a Magic Mover.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns - status
   */
  async loadMagicMover(req: Request, res: Response){
    try {
      const { moverId, itemId } = req.body;
      const mover = await this.magicMoverService.loadMagicMover(moverId, itemId);
      res.send(mover);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  /**
   * Start a mission for a Magic Mover.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @return - status
   */
  async startMission(req: Request, res: Response){
    try {
      const { moverId } = req.body;
      const mover = await this.magicMoverService.startMission(moverId);
      res.send(mover);
      return;
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      } 
    }
  }

  /**
   * End a mission for a Magic Mover.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  async endMission(req: Request, res: Response){
    try {
      const { moverId } = req.body;
      const mover = await this.magicMoverService.endMission(moverId);
      res.send(mover);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  /**
   * Get the top Magic Movers.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns - status
   */
  async getTopMovers(req: Request, res: Response){
    try {
      const movers = await this.magicMoverService.getTopMovers();
      res.send(movers);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      } 
    }
  }
}
