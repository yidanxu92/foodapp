import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useCart } from '@/hooks/useCart';
import MenuItem from '@/types/MenuItem';
import MenuItemAddOn from '@/types/MenuItemAddOn';

interface AddToCartButtonProps {
  menuItem: MenuItem;
  selectedSize: MenuItemAddOn | null;
  selectedExtras: MenuItemAddOn[];
}

const AddToCartButton = ({ menuItem, selectedSize, selectedExtras }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-lg">
        <button 
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          className="px-3 py-1 hover:bg-gray-100"
        >
          -
        </button>
        <span className="px-3 py-1">{quantity}</span>
        <button 
          onClick={() => setQuantity(prev => prev + 1)}
          className="px-3 py-1 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <Button 
        onClick={() => addToCart(menuItem, selectedSize, selectedExtras, quantity)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartButton; 