import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class PublicContactService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(dto: CreateMessageDto) {
    // 🕒 Verificamos si este email ya envió un mensaje recientemente
    const lastMessage = await this.prisma.message.findFirst({
      where: { email: dto.email },
      orderBy: { createdAt: 'desc' },
    });

    if (lastMessage) {
      const now = Date.now();
      const last = new Date(lastMessage.createdAt).getTime();
      const diffInMinutes = (now - last) / 1000 / 60;

      // ⏳ Evita mensajes duplicados por spam
      if (diffInMinutes < 5) {
        throw new BadRequestException(
          'Espera al menos 5 minutos antes de enviar otro mensaje.',
        );
      }
    }

    // 💾 Guardamos el mensaje en la base de datos
    const newMessage = await this.prisma.message.create({
      data: {
        name: dto.name,
        email: dto.email,
        content: dto.content,
      },
    });

    // 📦 Devolvemos un mensaje de éxito + los datos guardados
    return {
      message: 'Mensaje enviado correctamente ✅',
      data: {
        id: newMessage.id,
        name: newMessage.name,
        email: newMessage.email,
        content: newMessage.content,
        createdAt: newMessage.createdAt,
      },
    };
  }
}
