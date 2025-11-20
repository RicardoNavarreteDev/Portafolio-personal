import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [PrismaModule, AuthModule, ContactModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}