export interface ICRUD<I, O> {
    getAll(): Promise<O[]>;
    getById(id: string): Promise<O>;
    create(obj: I): Promise<O>;
    update(obj: I, id: string): Promise<O>;
    delete(id: string): Promise<void>;
  }