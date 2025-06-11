export interface ReservationConfirmUseCaseInterface {
  execute(id: string): Promise<void>;
}