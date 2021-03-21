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

export { PurchaseLocations, IShip, ObjectLocation, MarketplaceGood };
