export interface Repository<M> {
  findById(id: string): Promise<M>;
  findAll?(): Promise<M[]>;
  deleteById(id: string): Promise<number>;
  findByIds?(ids: string[]): Promise<M[]>;
  updateById(id: string, dto: Partial<M>): Promise<[affectedCount: number]>;
  create(dto: Partial<M>): Promise<M>;
}
