import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { AuthRequest } from 'src/types/auth-request';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ status: 200, description: 'Login exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiBearerAuth('access-token') // 👈 referencia al name de .addBearerAuth()
  @ApiResponse({ status: 200, description: 'Logout exitoso.' })
  @ApiResponse({ status: 401, description: 'Token inválido o revocado.' })
  async logout(@Req() req: AuthRequest) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token no proporcionado');
    return this.authService.logout(token);
  }
}