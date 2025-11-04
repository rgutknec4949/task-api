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

export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    // Validate that ID is a number
    const numericId = parseInt(id);
    if (isNaN(numericId) || numericId <= 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number']
      });
    }

    // Check if task exists first
    const existingTask = await taskService.getTaskById(numericId);
    if (!existingTask) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    const updatedTask = await taskService.updateTask(numericId, { title, completed });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
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

    // Check if task exists first
    const existingTask = await taskService.getTaskById(numericId);
    if (!existingTask) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    await taskService.deleteTask(numericId);
    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error) {
    next(error);
  }
}
