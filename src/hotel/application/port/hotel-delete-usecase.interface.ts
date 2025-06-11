export interface HotelDeleteUseCaseInterface {
  execute(id: string): Promise<void>;
}