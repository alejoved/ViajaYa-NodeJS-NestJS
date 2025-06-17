export interface ReservationCancelUseCaseInterface {
  execute(id: string): Promise<void>;
}