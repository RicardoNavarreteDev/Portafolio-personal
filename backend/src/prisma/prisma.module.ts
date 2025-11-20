import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // para poder usar PrismaService en cualquier módulo sin importarlo explícitamente
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}