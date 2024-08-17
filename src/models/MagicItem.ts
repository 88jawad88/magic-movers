import { Schema, model } from 'mongoose';

/**
 * Schema for Magic Item.
 * @type {Schema}
 */
const MagicItemSchema = new Schema({
  /**
   * Name of the Magic Item.
   * @type {string}
   * @unique
   * @required
   */
  name: { type: String, unique: true, required: true },

  /**
   * Weight of the Magic Item.
   * @type {number}
   * @required
   */
  weight: { type: Number, required: true },
});

/**
 * Magic Item model.
 * @type {import('mongoose').Model}
 */
export const MagicItem = model('MagicItem', MagicItemSchema);
