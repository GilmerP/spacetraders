interface ILoan {
  amount: string;
  collateralRequired: boolean;
  rate: number;
  termInDays: number;
  type: string;
}

interface PurchaseLocations {
  location: string;
  price: number;
}

interface IShip {
  class: string;
  manufacturer: string;
  maxCargo: number;
  type: string;
  id: string;
  location: string;
  purchaseLocations: PurchaseLocations[];
  cargo: [];
}

interface ObjectLocation {
  symbol: string;
  x: number;
  y: number;
  name: string;
  type: string;
  ships: Array<IShip>;
}

interface MarketplaceGood {
  pricePerUnit: number;
  quantityAvailable: number;
  symbol: string;
  volumePerUnit: number;
}

interface User {
  username: string;
  credits: number;
  ships: IShip[];
  loans: ILoan[];
}

export {
  PurchaseLocations,
  IShip,
  ObjectLocation,
  MarketplaceGood,
  ILoan,
  User
};
