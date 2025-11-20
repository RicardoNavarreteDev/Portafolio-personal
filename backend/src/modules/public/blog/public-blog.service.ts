import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from '../../../shared/repositories/blog.repository';
import { SearchBlogDto } from './dto/search-blog.dto';

@Injectable()
export class PublicBlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getPublishedPosts(searchDto: SearchBlogDto) {
    if (searchDto.search || searchDto.tag) {
      const searchTerm = searchDto.search || searchDto.tag;
      if (searchTerm) {
        return this.blogRepository.findBySearchTerm(searchTerm);
      }
    }
    return this.blogRepository.findPublished();
  }

  async getPostBySlug(slug: string) {
    const post = await this.blogRepository.findBySlug(slug);
    if (!post || !post.isPublished) {
      throw new NotFoundException('Post no encontrado');
    }
    return post;
  }
}