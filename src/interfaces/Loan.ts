export default interface Loan {
  amount: string;
  collateralRequired: boolean;
  rate: number;
  termInDays: number;
  type: string;
}
