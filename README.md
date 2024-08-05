# nestjs-prisma-crud
Crud_nest_Api_with_Prisma
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

comandos esenciales
1.npm i / instalar dependencias 
2.npm run start:dev  / correr el projecto
3.nest new nestjs-prisma-crud  / instalar el proyecto
4. npx prisma init --datasource-provider SQLite / para instalar la base de datos SQLite también podemos trabajar con postgres etc
5.npx prisma migrate dev --name init  / migración a la base de datos
6. npx prisma generate / mandar la migración y actualizar en la bd
7.npx prettier --write .  / refactorizar codido prettier de nest


Pasos para realizar el crud

Instalamos nest
1.instalamos nest o el proyecto 
*nest new nestjs-prisma-crud

2.eliminamos los archivos por dentro de src  controllers-service y el de testing

3.en el app.module.ts quitamos las importaciones de los archivos anteriores que eliminamos 

*import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}

4.instalamos prima 
*npm i prima -D

5.iniciamos nustra configuración de prisma 
*npx prisma init = asi es para trabajarlo con PostgreSQL pero en este caso vamos a usar sqlLite

*npx prisma init --datasource-provider SQLite = se creara un env y un archivo prisma

6.ahora en nuestro archivo schema.prisma creamos nuestra tabla tareas:
////////////////////////////////////////////////////////////////////////////
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Taks{
  id        Int      @id @default(autoincrement())
  title     String
  description String?

}


7.vamos a generar la tabla o convertirlo en una tabla
*npx prisma migrate dev --name init

8.ahora vamos a crear un modulo de conexión y creamos en src una carpeta llamada prima

9.luego creamos el archivo llamado prisma.service.ts
/////////////////////////////////////////////////////////////////

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  Task: any;
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }
}

10.luego creanos el siguiente archivo src/prisma/prisma.module.ts
//////////////////////////////////////////////////////////////////////////
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  //imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

//en este modulo lo puedo agregar en cualquier modulo que necesite

11.vamos a crear la carpeta src/task
12.creamos 3 archivos= task.controller.ts - task.module.ts - task.service.ts
13.en el archivo de task.service vamos hacer las peticiones http o métodos get,post,pacht,delete

14.vamos al task.service y creamos los métodos :
/////////////////////////////////////////////////////////////
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

15.ahora vamos al task.controller sirve para comunicarnos con el servicio ósea en el service se hace la lógica y luego en el controller es donde están los endpoint que sirve para conmunicarnos con el servicio o parte lógica

///////////////////////////////////////////////
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  // Implement CRUD operations here
  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Get(':id')
  async getTasksById(@Param('id') id: number) {
    const taskFound = await this.taskService.getTasksById(id);
    if (!taskFound) throw new NotFoundException('Task not exist');
    return taskFound;
  }
  @Post()
  async createTasks(@Body() data: Task) {
    return this.taskService.createTasks(data);
  }
  @Put(':id')
  async updateTasks(@Param('id') id: string, @Body() data: Task) {
    return this.taskService.updateTasks(Number(id), data);
  }
  @Delete(':id')
  async deleteTasks(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTasks(Number(id));
    } catch (error) {
      throw new NotFoundException('Task not exist o no existe');
    }
  }
}

16. Ejecutamos el projecto

