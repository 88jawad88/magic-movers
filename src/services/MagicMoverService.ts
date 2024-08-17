import { injectable } from "tsyringe";
import { MagicMover } from "../models/MagicMover";
import { MagicItem } from "../models/MagicItem";

@injectable()
export class MagicMoverService {
  /**
   * Add a new Magic Mover.
   * @param data - The data for the new Magic Mover.
   * @returns The created Magic Mover.
   */
  async addMagicMover(data: any) {
    const magicMover = new MagicMover(data);
    return await magicMover.save();
  }

  /**
   * Load a Magic Item into a Magic Mover.
   * @param moverId - The ID of the Magic Mover.
   * @param itemId - The ID of the Magic Item.
   * @returns The updated Magic Mover.
   */
  async loadMagicMover(moverId: string, itemId: string) {
    const mover = await MagicMover.findById(moverId);
    const item = await MagicItem.findById(itemId);

    if (!mover || !item) throw new Error("Mover or Item not found");
    if (mover.questState !== "resting") throw new Error("Mover is not in resting state");

    mover.items.push(item._id);
    mover.questState = "loading";
    return await mover.save();
  }

  /**
   * Start a mission for a Magic Mover.
   * @param moverId - The ID of the Magic Mover.
   * @returns The updated Magic Mover.
   */
  async startMission(moverId: string) {
    const mover = await MagicMover.findById(moverId);

    if (!mover) throw new Error("Mover not found");
    if (mover.questState !== "loading") throw new Error("Mover is not in loading state");

    mover.questState = "on-mission";
    return await mover.save();
  }

  /**
   * End a mission for a Magic Mover.
   * @param moverId - The ID of the Magic Mover.
   * @returns The updated Magic Mover.
   */
  async endMission(moverId: string) {
    const mover = await MagicMover.findById(moverId);

    if (!mover) throw new Error("Mover not found");
    if (mover.questState !== "on-mission") throw new Error("Mover is not on a mission");

    mover.items = [];
    mover.questState = "resting";
    mover.missionsCompleted += 1;
    return await mover.save();
  }

  /**
   * Get the top Magic Movers.
   * @returns A list of top Magic Movers.
   */
  async getTopMovers() {
    return await MagicMover.find().sort({ missionsCompleted: -1 });
  }
}
