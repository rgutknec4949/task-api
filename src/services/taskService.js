import * as taskRepository from '../repositories/taskRepo.js';

export async function getAllTasks() {
  return taskRepository.findAll();
}

export async function getTaskById(id) {
  return taskRepository.findById(id);
}

export async function createTask(newTask) {
  return taskRepository.create(newTask);
}

export async function updateTask(id, updateData) {
  return taskRepository.update(id, updateData);
}

export async function deleteTask(id) {
  return taskRepository.remove(id);
}
