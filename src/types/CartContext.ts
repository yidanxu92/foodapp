import CartProduct from "./CartProduct"
import MenuItem from "./MenuItem"
import MenuItemAddOn from "./MenuItemAddOn"

interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addToCart: (menuItem: MenuItem, selectedSize: MenuItemAddOn | null, selectedExtras: MenuItemAddOn[]) => void;
  removeCartProduct: (index: number) => void;
  clearCart: () => void;
  loadUserCart: (userEmail: string) => Promise<void>;
  saveUserCart: (userEmail: string) => Promise<void>;
}

export default CartContextType


