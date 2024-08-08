import { validationResult, check, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateTask = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),
  check('color').optional().isString().withMessage('Color must be a string'),
  check('isFavorite')
    .optional()
    .isBoolean()
    .withMessage('isFavorite must be a boolean'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        // errors: errors.array()[0].msg
      });
    }
    next();
  },
];

export const validateId = [
  param('id').isInt({ gt: 0 }).withMessage('Id must be a positive integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
