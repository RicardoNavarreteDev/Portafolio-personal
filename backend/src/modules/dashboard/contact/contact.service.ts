import { Injectable } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';

@Injectable()
export class ContactService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async getMessages(search?: string, status?: string) {
    if (search) {
      return this.messageRepository.findBySearchTerm(search);
    }

    const filter = status ? {
      where: { responded: status === 'responded' },
      orderBy: { createdAt: 'desc' as const }
    } : undefined;

    return this.messageRepository.findAll(filter);
  }

  async deleteMessage(id: number) {
    await this.messageRepository.delete(id);
    return { message: 'Mensaje eliminado correctamente', id };
  }

  async markAsResponded(id: number) {
    const message = await this.messageRepository.markAsResponded(id);
    return { message: 'Mensaje marcado como respondido', data: message };
  }

  async getStats() {
    return this.messageRepository.getStats();
  }
}
