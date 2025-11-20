import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { AuthRequest } from 'src/types/auth-request';
import type { DashboardResponse } from './interfaces/dashboard.interface';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(user: AuthRequest['user']): Promise<DashboardResponse> {
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const posts = await this.prisma.blog.count();
    const projects = 0;

    // obtenemos las estadísticas de mensajes
    const total = await this.prisma.message.count();
    const responded = await this.prisma.message.count({
      where: { responded: true },
    });
    const pending = total - responded;

    return {
      message: 'Bienvenido al Dashboard 🔐',
      user: {
        sub: user.sub,
        email: user.email,
        role: user.role
      },
      stats: {
        posts,
        projects,
        messages: { total, responded, pending },
      },
    };
  }
}
