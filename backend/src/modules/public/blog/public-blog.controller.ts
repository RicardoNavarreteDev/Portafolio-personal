import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SearchBlogDto } from './dto/search-blog.dto';
import { PublicBlogService } from './public-blog.service';
import { CreateBlogDto } from '../../../modules/dashboard/blog/dto/create-blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class PublicBlogController {
  constructor(private readonly blogService: PublicBlogService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener posts publicados' })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    description: 'Búsqueda por título o contenido' 
  })
  @ApiQuery({ 
    name: 'tag', 
    required: false, 
    description: 'Filtrar por etiqueta' 
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los posts publicados.',
    type: [CreateBlogDto]
  })
  getPublishedPosts(@Query() searchDto: SearchBlogDto) {
    return this.blogService.getPublishedPosts(searchDto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener post por slug' })
  @ApiParam({ 
    name: 'slug', 
    description: 'Slug único del post',
    example: 'introduccion-a-nestjs'
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna un post específico por su slug.',
    type: CreateBlogDto
  })
  @ApiResponse({
    status: 404,
    description: 'Post no encontrado o no publicado.',
  })
  getPostBySlug(@Param('slug') slug: string) {
    return this.blogService.getPostBySlug(slug);
  }
}