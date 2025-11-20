import { Module } from '@nestjs/common';
import { PublicBlogController } from './public-blog.controller';
import { PublicBlogService } from './public-blog.service';
import { BlogRepository } from '../../../shared/repositories/blog.repository';

@Module({
  controllers: [PublicBlogController],
  providers: [PublicBlogService, BlogRepository],
})
export class PublicBlogModule {}