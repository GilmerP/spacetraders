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
  purchaseLocations: PurchaseLocations[];
}

interface ObjectLocation {
  symbol: string;
  x: number;
  y: number;
  name: string;
  type: string;
  ships: Array<IShip>;
}

export { PurchaseLocations, IShip, ObjectLocation };
