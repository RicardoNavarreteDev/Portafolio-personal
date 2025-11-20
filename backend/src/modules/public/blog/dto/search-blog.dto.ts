import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchBlogDto {
  @ApiProperty({
    description: 'Término de búsqueda para filtrar posts',
    required: false,
    example: 'javascript',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filtrar posts por etiqueta',
    required: false,
    example: 'nestjs',
  })
  @IsOptional()
  @IsString()
  tag?: string;
}