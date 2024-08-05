import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  //metodo get para obtener
  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }
  //finaliza el metodo
  //metodo para obtener usuario o tarea por id
  async getTasksById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
  }
  //metodo parar crear tarea o usuarioA
  async createTasks(data: Task): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }
  //metodo para actualizar tareas o datos
  async updateTasks(id: number, data: Task): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  //metodo para eliminar datos tareas o usuarios
  async deleteTasks(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
