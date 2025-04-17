// Dans middlewares/validate.js
const Joi = require('joi');

exports.validateBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    condition: Joi.string().valid('neuf', 'occasion').required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
