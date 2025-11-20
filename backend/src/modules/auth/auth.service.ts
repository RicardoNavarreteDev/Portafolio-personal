import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Verifica email y password desde la base de datos.
   */
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    return user;
  }

  /**
   * Genera un JWT con info del usuario.
   */
  async login(user: { id: number; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  /**
   * Revoca el token (logout real en backend).
   */
  async logout(token: string) {
    if (!token) throw new UnauthorizedException('Token no encontrado');

    await this.prisma.revokedToken.create({ data: { token } });

    return { message: 'Logout exitoso. Token revocado en backend.' };
  }
}