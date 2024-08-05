import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    Task: any;
    onModuleInit(): Promise<void>;
}
