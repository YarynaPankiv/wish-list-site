export interface Wish {
  description: string;
  link: string;
  img: string | null;
  reserved?: boolean;
}

export interface WishList {
  id?: string;
  userId: string;
  name: string;
  wishes: Wish[];
}
