import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }

  findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    // Ensure it exists first to throw 404 if not
    await this.findOne(id);
    return this.prisma.todo.update({ where: { id }, data });
  }

  async remove(id: number): Promise<{ deleted: true }> {
    // Ensure it exists first to throw 404 if not
    await this.findOne(id);
    await this.prisma.todo.delete({ where: { id } });
    return { deleted: true } as const;
  }
}
