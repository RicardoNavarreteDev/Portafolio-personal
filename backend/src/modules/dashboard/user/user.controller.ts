import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/modules/auth/strategies/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Dashboard - User')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('dashboard/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Obtiene los datos del usuario actual.',
  })
  async getProfile(@Req() req) {
    return this.userService.getProfile(req.user.sub);
  }

  @Put('update')
  @ApiResponse({
    status: 200,
    description: 'Actualiza nombre, apellido o correo.',
  })
  async updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.sub, dto);
  }

  @Put('password')
  @ApiResponse({
    status: 200,
    description: 'Actualiza la contraseña del usuario.',
  })
  async updatePassword(@Req() req, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(req.user.sub, dto);
  }
}
