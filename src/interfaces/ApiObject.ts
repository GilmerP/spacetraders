import User from "./User";
import Ship from "./Ship";
import Location from "./Location";
import Order from "./Order";
import Loan from "./Loan";
import FlightPlan from "./FlightPlan";

export default interface ApiObject {
  user: User;
  ship: Ship;
  ships: Ship[];
  location: Location;
  order: Order;
  loans: Loan[];
  token: string;
  locations: Location[];
  flightPlan: FlightPlan;
  error: { message: string };
}
