import { Schema, model } from 'mongoose';

/**
 * Schema for Magic Mover.
 * @type {Schema}
 */
const MagicMoverSchema = new Schema({
  /**
   * Name of the Magic Mover.
   * @type {string}
   * @unique
   * @required
   */
  name: { type: String, unique: true, required: true },

  /**
   * Weight limit that the Magic Mover can carry.
   * @type {number}
   * @required
   */
  weightLimit: { type: Number, required: true },

  /**
   * Current state of the Magic Mover's quest.
   * @type {string}
   * @enum {'resting' | 'loading' | 'on-mission'}
   * @default 'resting'
   */
  questState: { type: String, enum: ['resting', 'loading', 'on-mission'], default: 'resting' },

  /**
   * Items associated with the Magic Mover.
   * @type {Array<Schema.Types.ObjectId>}
   * @ref 'MagicItem'
   */
  items: [{ type: Schema.Types.ObjectId, ref: 'MagicItem' }],

  /**
   * Number of missions completed by the Magic Mover.
   * @type {number}
   * @default 0
   */
  missionsCompleted: { type: Number, default: 0 }
});

/**
 * Magic Mover model.
 * @type {import('mongoose').Model}
 */
export const MagicMover = model('MagicMover', MagicMoverSchema);
