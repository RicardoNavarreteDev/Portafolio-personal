export interface IBaseRepository<T> {
  findOne(id: number): Promise<T | null>;
  findAll(filter?: any): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}