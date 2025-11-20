import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';

@Controller('test')
export class TestController {
  @UseGuards(JwtAuthGuard)
  @Get('private')
  getPrivateData(@Req() req) {
    return {
      message: '✅ Acceso permitido',
      user: req.user, // aquí viene el payload decodificado
    };
  }
}