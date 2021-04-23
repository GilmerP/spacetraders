import Owner from "./Owner";

export default interface Structure {
  id: string;
  location: string;
  owendBy: Owner;
  type: string;
}
