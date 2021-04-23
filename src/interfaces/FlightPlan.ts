export default interface FlightPlan {
  arrivesAt: string;
  createdAt: string;
  departure: string;
  destination: string;
  distance: number;
  fuelConsumed: number;
  fuelRemaining: number;
  id: string;
  shipId: string;
  terminatedAt?: string;
  timeRemainingInSeconds: number;
}
