import { Module } from '@nestjs/common';
import { AdminBlogController } from './admin-blog.controller';
import { AdminBlogService } from './admin-blog.service';
import { BlogRepository } from '../../../shared/repositories/blog.repository';

@Module({
  controllers: [AdminBlogController],
  providers: [AdminBlogService, BlogRepository],
})
export class AdminBlogModule {}