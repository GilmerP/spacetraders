import Ship from "./Ship";
import Loan from "./Loan";

export default interface User {
  username: string;
  credits: number;
  ships: Array<Ship>;
  loans: Array<Loan>;
  token?: string;
}
