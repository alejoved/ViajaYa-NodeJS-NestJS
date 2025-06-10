export interface FlightDeleteUseCaseInterface {
  execute(id: string): Promise<void>;
}