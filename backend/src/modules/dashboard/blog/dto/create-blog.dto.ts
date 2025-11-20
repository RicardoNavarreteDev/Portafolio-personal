import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, MinLength } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    example: 'Introducción a NestJS',
    description: 'Título del post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'Una breve descripción del post...',
    description: 'Descripción corta del post',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '# Contenido del post\n\nEste es el contenido principal...',
    description: 'Contenido completo del post en Markdown',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;

  @ApiProperty({
    example: ['nestjs', 'javascript', 'backend'],
    description: 'Etiquetas relacionadas con el post',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen principal del post',
  })
  @IsString()
  @IsOptional()
  image?: string;
}