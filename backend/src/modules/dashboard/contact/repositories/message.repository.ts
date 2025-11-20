import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { BaseRepository } from '../../../../common/repositories/base.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class MessageRepository extends BaseRepository<Message> {
  constructor(prisma: PrismaService) {
    super(prisma, 'message');
  }

  async findByEmail(email: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySearchTerm(search: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats() {
    const total = await this.prisma.message.count();
    const responded = await this.prisma.message.count({
      where: { responded: true },
    });
    return {
      total,
      responded,
      pending: total - responded,
    };
  }

  async markAsResponded(id: number): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data: {
        responded: true,
        respondedAt: new Date(),
      },
    });
  }
}