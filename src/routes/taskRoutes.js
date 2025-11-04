import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';
import { validateId } from '../middleware/validateId.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.get('/:id', validateId, taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);


export default router;
