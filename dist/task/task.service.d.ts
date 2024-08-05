import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
export declare class TaskService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllTasks(): Promise<Task[]>;
    getTasksById(id: number): Promise<Task>;
    createTasks(data: Task): Promise<Task>;
    updateTasks(id: number, data: Task): Promise<Task>;
    deleteTasks(id: number): Promise<Task>;
}
