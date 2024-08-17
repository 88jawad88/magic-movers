import { injectable } from "tsyringe";

import { MagicItem} from "../models/MagicItem";

/**
 * Service for managing Magic Items.
 */
@injectable()
export class MagicItemService {
  /**
   * Add a new Magic Item.
   * @param {any} data - The data for the new Magic Item.
   * @returns  The created Magic Item.
   */
  async addMagicItem(data: any) {
    const magicItem = new MagicItem(data);
    return await magicItem.save();
  }
}
