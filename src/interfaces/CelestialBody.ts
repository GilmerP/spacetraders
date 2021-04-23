import Ship from "./Ship";

export default interface CelestialBody {
  symbol: string;
  x: number;
  y: number;
  name: string;
  type: string;
  ships: Array<Ship>;
}
