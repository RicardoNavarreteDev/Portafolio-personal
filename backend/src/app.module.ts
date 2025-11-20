import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TestModule } from './modules/test/test.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PublicContactModule } from './modules/public/contact/public-contact.module';
import { UserModule } from './modules/dashboard/user/user.module';
import { PublicBlogModule } from './modules/public/blog/public-blog.module';
import { AdminBlogModule } from './modules/dashboard/blog/admin-blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    DashboardModule,
    PublicContactModule,
    UserModule,
    TestModule,
    PublicBlogModule,
    AdminBlogModule,
  ],
})
export class AppModule {}