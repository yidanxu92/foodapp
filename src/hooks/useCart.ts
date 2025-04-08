import { useContext } from 'react';
import { CartContext } from '@/util/ContextProvider';
import MenuItem from '@/types/MenuItem';
import MenuItemAddOn from '@/types/MenuItemAddOn';

export const useCart = () => {
  const { cartProducts, setCartProducts, ...rest } = useContext(CartContext);
  
  const enhancedAddToCart = (
    menuItem: MenuItem, 
    selectedSize: MenuItemAddOn | null, 
    selectedExtras: MenuItemAddOn[], 
    quantity: number = 1
  ) => {
    // update the cart products
    setCartProducts(prevProducts => {
      const existingProductIndex = prevProducts.findIndex(product =>
        product.menuItem._id === menuItem._id &&
        product.selectedSize?._id === selectedSize?._id &&
        JSON.stringify(product.selectedExtras) === JSON.stringify(selectedExtras)
      );

      if (existingProductIndex !== -1) {
        // if the product already exists, increase the quantity
        return prevProducts.map((product, index) => {
          if (index === existingProductIndex && product.quantity < 10) {
            return {
              ...product,
              quantity: Math.min(product.quantity + quantity, 10)
            };
          }
          return product;
        });
      } else {
        // if the product does not exist, add it to the cart
        return [...prevProducts, { 
          menuItem, 
          selectedSize, 
          selectedExtras, 
          quantity: Math.min(quantity, 10)
        }];
      }
    });
  };
  
  return {
    cartProducts,
    setCartProducts,
    ...rest,
    addToCart: enhancedAddToCart
  };
}; 