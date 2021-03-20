interface PurchaseLocations {
  location: string;
  price: number;
}

interface IShip {
  class: string;
  manufacturer: string;
  maxCargo: number;
  type: string;
  purchaseLocations: PurchaseLocations[];
}

export { PurchaseLocations, IShip };
