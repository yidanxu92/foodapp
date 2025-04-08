import MenuItem from "./MenuItem"
import MenuItemAddOn from "./MenuItemAddOn"

type CartProduct = {
  menuItem: MenuItem;
  selectedSize: MenuItemAddOn | null;
  selectedExtras: MenuItemAddOn[];
  quantity: number;
}

export default CartProduct;