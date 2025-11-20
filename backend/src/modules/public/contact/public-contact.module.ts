import { Module } from '@nestjs/common';
import { PublicContactController } from './public-contact.controller';
import { PublicContactService } from './public-contact.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PublicContactController],
  providers: [PublicContactService],
})
export class PublicContactModule {}