import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log(chalk.blue('✅ Conexión exitosa a la base de datos'));
    } catch (error) {
      console.error(chalk.red('❌ Error al conectar con la base de datos:'), error.message);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}