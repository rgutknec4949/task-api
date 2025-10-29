import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    
    // Validate that ID is a number
    const numericId = parseInt(id);
    if (isNaN(numericId) || numericId <= 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number']
      });
    }

    const task = await taskService.getTaskById(numericId);
    
    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
