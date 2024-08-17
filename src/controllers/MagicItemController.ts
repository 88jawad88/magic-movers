import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { MagicItemService } from "../services/MagicItemService";
import { validateMagicItem } from "../utils/validation";

@injectable()
export class MagicItemController {
  constructor(
    @inject(MagicItemService) private magicItemService: MagicItemService
  ) {}

  /**
   * Add a new Magic Item.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns -status.
   */
  async addMagicItem(req: Request, res: Response){
    const { error } = validateMagicItem(req.body);
    if (error) res.status(400).send(error.details[0].message);
    try {
      const magicItem = await this.magicItemService.addMagicItem(req.body);
      res.send(magicItem);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "MongoError" && (err as any).code === 11000) {
          // Duplicate key error
          res.send("duplicated name of Magic Item");
        }
        res.status(400).send("Magic Item with this name already exists");
      }
    }
  }
}
