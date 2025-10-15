import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
