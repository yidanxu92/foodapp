import MenuItemAddOn from "./MenuItemAddOn";

type MenuItem = {
  _id?: string | number;
  name: string;
  image: string;
  description: string;
  basePrice: string | number;
 
}

export default MenuItem;