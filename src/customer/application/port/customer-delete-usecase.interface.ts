export interface CustomerDeleteUseCaseInterface {
  execute(id: string): Promise<void>;
}