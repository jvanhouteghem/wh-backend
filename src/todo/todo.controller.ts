import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { AppLogger } from '../app.logger';

@Controller('todos')
export class TodoController {
  private readonly logger = new AppLogger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: CreateTodoDto) {
    this.logger.log(`Create todo: ${JSON.stringify(body)}`);
    return this.todoService.create(body);
  }

  @Get()
  findAll() {
    this.logger.log('Get all todos');
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Get todo ${id}`);
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTodoDto) {
    this.logger.log(`Update todo ${id}: ${JSON.stringify(body)}`);
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Delete todo ${id}`);
    return this.todoService.remove(id);
  }
}
