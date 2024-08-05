//esta carpeta de task va estar importando la carpeta de prisma y la de prisma
//va estar exportando

import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from '../prisma/prisma.module'; // importamos la carpeta de prisma  // esta carpeta va estar en la raiz del proyecto

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
