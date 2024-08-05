import { TaskService } from './task.service';
import { Task } from '@prisma/client';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<{
        id: number;
        title: string;
        description: string | null;
    }[]>;
    getTasksById(id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
    }>;
    createTasks(data: Task): Promise<{
        id: number;
        title: string;
        description: string | null;
    }>;
    updateTasks(id: string, data: Task): Promise<{
        id: number;
        title: string;
        description: string | null;
    }>;
    deleteTasks(id: string): Promise<{
        id: number;
        title: string;
        description: string | null;
    }>;
}
