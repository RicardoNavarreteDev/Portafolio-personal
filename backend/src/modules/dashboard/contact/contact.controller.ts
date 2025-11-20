import {
  Controller,
  Get,
  Query,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from 'src/modules/auth/strategies/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Dashboard - Contact')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('dashboard/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, description: 'Filtrar por nombre o correo' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por estado: pending o responded',
    example: 'pending',
  })
  @ApiResponse({
    status: 200,
    description: 'Obtiene los mensajes, con filtros opcionales por nombre/correo o estado.',
  })
  async getMessages(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.contactService.getMessages(search, status);
  }

  @Get('stats')
  @ApiResponse({ status: 200, description: 'Estadísticas de mensajes: total, respondidos y pendientes.' })
  async getStats() {
    return this.contactService.getStats();
  }

  @Put(':id/respond')
  @ApiResponse({ status: 200, description: 'Marca un mensaje como respondido.' })
  async respond(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.markAsResponded(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un mensaje por su ID.' })
  async deleteMessage(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteMessage(id);
  }
}
