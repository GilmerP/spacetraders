import PurchaseLocation from "./PurchaseLocation";
import Cargo from "./Cargo";

export default interface IShip {
  class: string;
  manufacturer: string;
  maxCargo: number;
  type: string;
  id: string;
  location: string;
  purchaseLocations: PurchaseLocation[];
  cargo: Array<Cargo>;
}
