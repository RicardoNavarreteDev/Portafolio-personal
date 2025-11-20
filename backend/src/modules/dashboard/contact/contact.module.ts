import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageRepository } from './repositories/message.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ContactController],
  providers: [ContactService, MessageRepository],
})
export class ContactModule {}