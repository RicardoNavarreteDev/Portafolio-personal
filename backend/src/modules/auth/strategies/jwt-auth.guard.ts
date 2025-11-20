import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  // Este método se ejecuta antes de llegar al controlador
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token inválido');
    }

    // Verificar si el token fue revocado
    const revoked = await this.prisma.revokedToken.findUnique({
      where: { token },
    });

    if (revoked) {
      throw new UnauthorizedException('Token revocado');
    }

    // Si no está revocado, continuar con la validación estándar de JWT
    const result = (await super.canActivate(context)) as boolean;
    return result;
  }
}
