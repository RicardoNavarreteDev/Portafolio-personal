import { PrismaService } from '../../prisma/prisma.service';
import { IBaseRepository } from '../interfaces/base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  async findOne(id: number): Promise<T | null> {
    return this.prisma[this.modelName].findUnique({
      where: { id },
    }) as Promise<T>;
  }

  async findAll(filter?: any): Promise<T[]> {
    return this.prisma[this.modelName].findMany(filter) as Promise<T[]>;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.prisma[this.modelName].create({
      data,
    }) as Promise<T>;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.prisma[this.modelName].update({
      where: { id },
      data,
    }) as Promise<T>;
  }

  async delete(id: number): Promise<void> {
    await this.prisma[this.modelName].delete({
      where: { id },
    });
  }
}