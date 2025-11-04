import { param } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive number')
    .toInt(), 
  
  checkValidationResults,
];