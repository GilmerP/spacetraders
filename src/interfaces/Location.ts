import Ship from "./Ship";
import Good from "./Good";
import Structure from "./Structure";

export default interface Location {
  allowsConstruction: boolean;
  marketplace: Array<Good>;
  name: string;
  ships: Array<Ship>;
  structures: Array<Structure>;
  symbol: string;
  type: string;
  x: number;
  y: number;
}
