import PurchaseLocation from "./PurchaseLocation";
import Cargo from "./Cargo";

export default interface IShip {
  class: string;
  manufacturer: string;
  maxCargo: number;
  speed: number;
  type: string;
  id: string;
  flightPlanId?: string;
  location: string;
  purchaseLocations: PurchaseLocation[];
  cargo: Array<Cargo>;
  loadingSpeed: number;
  x?: number;
  y?: number;
}
