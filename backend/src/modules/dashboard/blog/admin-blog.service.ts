import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from '../../../shared/repositories/blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { slugify } from '../../../common/utils/slugify';

@Injectable()
export class AdminBlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getAllPosts() {
    return this.blogRepository.findAll({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createPost(dto: CreateBlogDto) {
    const slug = slugify(dto.title);
    return this.blogRepository.create({
      ...dto,
      slug,
      isPublished: false
    });
  }

  async updatePost(id: number, dto: UpdateBlogDto) {
    const post = await this.blogRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Post no encontrado');
    }

    const slug = dto.title ? slugify(dto.title) : post.slug;
    return this.blogRepository.update(id, {
      ...dto,
      slug
    });
  }

  async togglePublishStatus(id: number) {
    return this.blogRepository.togglePublishStatus(id);
  }

  async deletePost(id: number) {
    await this.blogRepository.delete(id);
    return { message: 'Post eliminado correctamente' };
  }
}