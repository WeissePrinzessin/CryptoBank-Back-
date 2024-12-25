export interface OfferTaken {
  id: number;
  id_l: number;
  id_c: number;
  Id_o: number;
  date_give: string;
  date_close: string;
  new_ammount: number;
  is_close: boolean;
  is_expired: boolean;
  day_pass: number;
  
  creditor: User;
  loaner: User;
  offer: Offer
}


export interface Offer {
    id: number;
    ammount: number;
    percent: number;
    loan: number;
    id_c: number;
    is_give: boolean;
    creditor: User;
    loaner: User;
    is_pub: boolean;
  }
  
  export interface User {
    id: number;
    username: string;
    password: string;
    rating: number;
    count_rating: number;
    dev_wallet: number;
  }