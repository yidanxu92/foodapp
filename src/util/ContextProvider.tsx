'use client';
// Import types and dependencies
import CartProduct from '@/types/CartProduct';
import CartContextType from '@/types/CartContext';
import { SessionProvider, useSession } from 'next-auth/react';
import { Toaster, toast } from 'react-hot-toast';
import { createContext, useEffect, useState } from 'react';
import React from 'react';
import MenuItem from '@/types/MenuItem';
import MenuItemAddOn from '@/types/MenuItemAddOn';

/**
 * Create shopping cart context object
 * Initial value is empty object (via type assertion)
 */
export const CartContext = React.createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
  removeCartProduct: () => {},
  loadUserCart: async (email: string) => {},
  saveUserCart: async (email: string) => {},
  addToCart: () => {},
  clearCart: () => {}
} as CartContextType);

/**
 * Calculate total price for a single cart product
 * @param product Cart product object
 * @returns Calculated total price (in cents)
 */
export function calCartProductPrice(product: CartProduct): number {
  let price = product.menuItem.basePrice as number;
  if (product.selectedSize) {
    price += product.selectedSize.price as number;
  }
  if (product.selectedExtras.length > 0) {
    for (const extra of product.selectedExtras) {
      price += extra.price as number;
    }
  }
  return price;
}

/**
 * Main application context provider component
 * This component provides cart state management functionality
 * It wraps the entire application with the context provider
 */
export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </SessionProvider>
  );
}

function CartContextProvider({ children }: { children: React.ReactNode }) {
  // State to store the cart products
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  // State to store session data (user login session)
  const { data: session } = useSession();
  // State to track if cart data is still loading
  const [isLoading, setIsLoading] = useState(true);
  // Local storage access (only available in the browser)
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  // Effect hook to load cart data when the user logs in or session changes
  useEffect(() => {
    const loadCart = async () => {
      
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/cart');
        
        if (!response.ok) {
          throw new Error(`Failed to load cart: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && Array.isArray(data.cart)) {
          setCartProducts(data.cart);// Set the cart products in state
        } else {
          return;
        }
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);// Set loading to false after the request is done
      }
    };

    loadCart();// Call the loadCart function when the effect runs
  }, [session?.user?.email]);

  // Effect hook to save the cart data when it changes
  useEffect(() => {
    // If the cart is still loading or user is not logged in, skip saving
    if (isLoading || !session?.user?.email) return;
    
    const timeoutId = setTimeout(async () => {
      try {
         // Save the cart data to the API
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cartProducts }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save cart: ${response.status}`);
        }

        const data = await response.json();
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    }, 300);// Wait 300ms before saving to avoid multiple requests

    return () => clearTimeout(timeoutId);// Clear the timeout when the component unmounts
  }, [cartProducts, session?.user?.email, isLoading]);


   /**
   * Add a product to the cart
   * Checks if the product already exists, and if so, increases its quantity
   * @param menuItem The menu item being added to the cart
   * @param selectedSize The size selected for the menu item (if any)
   * @param selectedExtras The extras selected for the menu item (if any)
   */
  function addToCart(
    menuItem: MenuItem,
    selectedSize: MenuItemAddOn | null,
    selectedExtras: MenuItemAddOn[]
  ) {
    setCartProducts(prevProducts => {
      const existingProductIndex = prevProducts.findIndex(product =>
        product.menuItem._id === menuItem._id &&
        product.selectedSize?._id === selectedSize?._id &&
        JSON.stringify(product.selectedExtras) === JSON.stringify(selectedExtras)
      );

      if (existingProductIndex !== -1) {
        // If the product already exists, increase its quantity (up to a maximum of 10)
        return prevProducts.map((product, index) => {
          if (index === existingProductIndex && product.quantity < 10) {
            return {
              ...product,
              quantity: product.quantity + 1
            };
          }
          return product;
        });
      } else {
        // If the product does not exist, add it to the cart
        return [...prevProducts, { 
          menuItem, 
          selectedSize, 
          selectedExtras, 
          quantity: 1
        }];
      }
    });
    
    toast.success('Added to cart');
  }
  /**
   * Clear the entire cart
   */
  function clearCart() {
    setCartProducts([]);// Reset the cart to an empty array
  }

  function removeCartProduct(indexToRemove: number) {
    setCartProducts(prevProducts => prevProducts.filter((v, index) => index !== indexToRemove));
    toast.success('Product removed from cart');
  }
  /**
   * Remove a specific product from the cart by its index
   * @param indexToRemove Index of the product to remove
   */
  return (
    <CartContext.Provider value={{ 
      cartProducts, 
      setCartProducts,
      addToCart, 
      clearCart, 
      removeCartProduct,
      loadUserCart: async () => {},
      saveUserCart: async () => {}
    }}>
      <Toaster />{/* Provide toast notifications for the application */}
      {children}{/* Render children components */}
    </CartContext.Provider>
  );
}
