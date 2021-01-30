export interface Post {
  //id?: string;
  cardNumber:String;
  cardHolder: string;
  ExpirationDate: Date;
  securityCode?:String;
  amount:Number;
}
