export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  insert(data: Partial<T>): Promise<void>;
  update(id: number, data: Partial<T>): Promise<void>;
  remove(id: number): Promise<void>;
}
