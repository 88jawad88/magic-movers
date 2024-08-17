import Joi from 'joi';

export const validateMagicMover = (mover: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    weightLimit: Joi.number().required(),
    questState: Joi.string().valid('resting', 'loading', 'on-mission').default('resting')
  });

  return schema.validate(mover);
};

export const validateMagicItem = (item: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    weight: Joi.number().required()
  });

  return schema.validate(item);
};
