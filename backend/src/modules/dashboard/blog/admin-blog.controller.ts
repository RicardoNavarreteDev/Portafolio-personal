import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/strategies/jwt-auth.guard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AdminBlogService } from './admin-blog.service';

@ApiTags('Dashboard - Blog')
@ApiBearerAuth('access-token')
@Controller('dashboard/blog')
@UseGuards(JwtAuthGuard)
export class AdminBlogController {
  constructor(private readonly adminBlogService: AdminBlogService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los posts' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los posts (publicados y borradores).',
    type: [CreateBlogDto]
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o expirado',
  })
  getAllPosts() {
    return this.adminBlogService.getAllPosts();
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo post' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({
    status: 201,
    description: 'Post creado exitosamente.',
    type: CreateBlogDto
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la petición',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o expirado',
  })
  createPost(@Body() createBlogDto: CreateBlogDto) {
    return this.adminBlogService.createPost(createBlogDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar post existente' })
  @ApiParam({ name: 'id', description: 'ID del post a actualizar' })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({
    status: 200,
    description: 'Post actualizado exitosamente.',
    type: CreateBlogDto
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la petición',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o expirado',
  })
  @ApiResponse({
    status: 404,
    description: 'Post no encontrado',
  })
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.adminBlogService.updatePost(id, updateBlogDto);
  }

  @Put(':id/publish')
  @ApiOperation({ summary: 'Alternar estado de publicación' })
  @ApiParam({ name: 'id', description: 'ID del post a publicar/despublicar' })
  @ApiResponse({
    status: 200,
    description: 'Estado de publicación del post actualizado.',
    schema: {
      properties: {
        isPublished: {
          type: 'boolean',
          description: 'Nuevo estado de publicación'
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o expirado',
  })
  @ApiResponse({
    status: 404,
    description: 'Post no encontrado',
  })
  togglePublish(@Param('id', ParseIntPipe) id: number) {
    return this.adminBlogService.togglePublishStatus(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar post' })
  @ApiParam({ name: 'id', description: 'ID del post a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Post eliminado exitosamente.',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Post eliminado correctamente'
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o expirado',
  })
  @ApiResponse({
    status: 404,
    description: 'Post no encontrado',
  })
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.adminBlogService.deletePost(id);
  }
}