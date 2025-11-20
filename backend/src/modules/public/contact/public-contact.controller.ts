import { Controller, Post, Body } from '@nestjs/common';
import { PublicContactService } from './public-contact.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Public Contact')
@Controller('contact')
export class PublicContactController {
  constructor(private readonly publicContactService: PublicContactService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Mensaje enviado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiBody({ type: CreateMessageDto })
  async createMessage(@Body() dto: CreateMessageDto) {
    return this.publicContactService.createMessage(dto);
  }
}
