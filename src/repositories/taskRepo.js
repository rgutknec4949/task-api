import prisma from '../config/db.js';

export async function findAll() {
  return prisma.task.findMany();
}

export async function findById(id) {
  return prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
}

// Create a new task
export async function create(data) {
  return prisma.task.create({
    data,
  });
}

// Update a task
export async function update(id, data) {
  return prisma.task.update({
    where: { id: parseInt(id) },
    data,
  });
}

// Delete a task
export async function remove(id) {
  return prisma.task.delete({
    where: { id: parseInt(id) },
  });
}
