import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { BaseRepository } from '../../common/repositories/base.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BlogRepository extends BaseRepository<Blog> {
  constructor(prisma: PrismaService) {
    super(prisma, 'blog');
  }

  async findPublished() {
    return this.prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.blog.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async findBySearchTerm(search: string) {
    return this.prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
          { tags: { hasSome: [search] } }
        ],
        isPublished: true
      },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async togglePublishStatus(id: number) {
    const post = await this.findOne(id);
    
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    return this.prisma.blog.update({
      where: { id },
      data: { isPublished: !post.isPublished }
    });
  }
}