import MenuItemAddOn from "./MenuItemAddOn";

interface MenuItem {
  _id?: string | number;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string | number;
  sizes: MenuItemAddOn[];
  extraIngredientsPrices: MenuItemAddOn[];
}

export default MenuItem;