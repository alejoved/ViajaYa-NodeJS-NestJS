export interface ReservationDeleteUseCaseInterface {
  execute(id: string): Promise<void>;
}