import { TrashIcon } from '@/icons/TrashIcon'
import type CartProduct from '@/types/CartProduct'
import { Tooltip } from '@nextui-org/react'
import { useContext } from 'react'
import { CartContext } from '@/util/ContextProvider'

interface CartProductProps {
  product: CartProduct,
  productPrice: number,
  onRemove?: () => void,
}

const CartProduct = ({ product, productPrice, onRemove }: CartProductProps) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    
    setCartProducts(prevProducts => 
      prevProducts.map(p => 
        p.menuItem._id === product.menuItem._id &&
        p.selectedSize?._id === product.selectedSize?._id &&
        JSON.stringify(p.selectedExtras) === JSON.stringify(product.selectedExtras)
          ? { ...p, quantity: newQuantity }
          : p
      )
    );
  };

  return (
    <div className='grid grid-cols-8 gap-4 border-b pt-2'>
      <div className='col-span-2'>
        <div style={{ backgroundImage: `url(${product.menuItem.image})`, borderRadius: '10%' }} className='bg-cover bg-center bg-no-repeat mb-4 w-[120px] h-[120px]'></div>
      </div>
      <div className='col-span-3 px-4'>
        <p className='font-semibold'>{product.menuItem.name}</p>
        {product.selectedSize && (
          <div className='text-sm text-gray-300 py-1'>
            Size: <span>{product.selectedSize.name} + ${ (product.selectedSize.price as number).toFixed(2)}</span>
          </div>
        )}
        {product.selectedExtras.length > 0 && (
          <div className='text-sm text-gray-300'>
            {product.selectedExtras.map((extra, index) => (
              <div key={index}>{extra.name} + ${((extra.price) as number).toFixed(2)}</div>
            ))}
          </div>
        )}
      </div>
      <div className='items-start text-center'>
        <p className='font-semibold'>Quantity</p>
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => updateQuantity(product.quantity - 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span className="w-8 text-center">{product.quantity}</span>
          <button 
            onClick={() => updateQuantity(product.quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={product.quantity >= 10}
          >
            +
          </button>
        </div>
      </div>
      <div className='text-right font-semibold'>
        ${(productPrice * product.quantity).toFixed(2)}
      </div>
      {!!onRemove && (
        <Tooltip content='Remove'>
          <div className='ml-6 cursor-pointer' onClick={onRemove}>
            <TrashIcon className={'w-6'} />
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default CartProduct