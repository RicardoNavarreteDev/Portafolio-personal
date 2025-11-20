import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import type { AuthRequest } from 'src/types/auth-request';

@ApiTags('Dashboard')
@ApiBearerAuth('access-token')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna la información general del panel (resumen de datos).',
    type: DashboardResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token JWT faltante o inválido.',
  })
  async getDashboard(@Req() req: AuthRequest) {
    return this.dashboardService.getOverview(req.user);
  }
}

