/**
 * Cart Page Component
 * 
 * This component handles the shopping cart functionality and checkout process.
 * Key features:
 * - Displays cart items and total price
 * - Manages delivery/pickup options
 * - Handles user information input
 * - Enforces delivery restrictions to Lawrenceville area
 * - Processes checkout and redirects to Stripe payment
 * 
 * The component implements a fixed delivery address system where:
 * - Users can only get delivery to Lawrenceville, NJ
 * - Street address is editable, but city/state/etc. are fixed
 * - Supports both delivery and pickup options
 * - Integrates with Stripe for payment processing
 */

'use client'
import AddressInputs from '@/components/common/form/AddressInputs'
import CartProduct from '@/components/features/cart/CartProduct'
import OrderSummary from '@/components/features/cart/OrderSummary'
import { useProfile } from '@/components/hooks/useProfile'
import { CartContext, calCartProductPrice } from '@/util/ContextProvider'
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon'
import { Button, Link, Switch } from '@nextui-org/react'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Define ProfileData type
interface ProfileData {
  name?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  userName?: string;
}

const CartPage = () => {
  // Access cart context for products and cart operations
  const { cartProducts, removeCartProduct, loadUserCart, saveUserCart, addToCart } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [address, setAddress] = useState<Partial<ProfileData>>({});
  const { data: profileData } = useProfile();
  const [isDelivery, setIsDelivery] = useState(true);

  // Define the fixed delivery address for Lawrenceville area
  const FIXED_ADDRESS = {
    city: 'Lawrenceville',
    state: 'NJ',
    country: 'USA',
    postalCode: '08648'
  };

  // Set initial address when profile data loads
  useEffect(() => {
    if (profileData) {
      const { name, phone, streetAddress } = profileData;
      // Combine user's personal info with fixed delivery address
      const userAddress = {
        userName: name,
        phone,
        streetAddress,
        ...FIXED_ADDRESS  
      };
      setAddress(userAddress);
    }
  }, [profileData])

  // Handle payment cancellation notification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 🙁')
      }
    }
  }, [])

  // Calculate total price of items in cart
  let subtotal = 0;
  cartProducts.forEach(cartProduct => {
    subtotal += calCartProductPrice(cartProduct) * cartProduct.quantity;
  });

  // Handle changes to user input fields
  // Only allow changes to personal info (name, phone) and street address
  function handleAddressChange(propName: string, value: string): void {
    if (propName === 'userName' || propName === 'phone' || propName === 'streetAddress') {
      setAddress((prevAddress: Partial<ProfileData>) => ({ 
        ...prevAddress, 
        [propName]: value 
      }));
    }
  }

  const[error, setError] = useState('');
  

  // Process checkout and redirect to payment
  async function proceedToCheckOut(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    // Set delivery method and fee based on user selection
    const deliveryMethod = isDelivery ? "delivery" : "pickup";
    const deliveryFee = isDelivery ? 500 : 0;

    const { userName, phone, streetAddress } = address;
    if (!userName || !phone || (isDelivery && !streetAddress)) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    
    // Create checkout session with Stripe
    const promise = new Promise<void>((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: FIXED_ADDRESS, cartProducts, deliveryMethod, deliveryFee }),
      }).then(async response => {
        if (response.ok) {
          const data = await response.json(); 
          
          if (data.stripeUrl) {
            ;
            window.location.href = data.stripeUrl;  // 使用 window.location.href 进行重定向
          } 
          resolve();
        } else {
          const errorText = await response.text();
         
          reject();
        }
      }).catch(error => {
        
        reject();
      });
    });

    // Show loading state during checkout process
    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong, please try again later.'
    });
  }

  // Calculate delivery fee based on delivery method
  const deliveryFee = isDelivery ? 5 : 0;

  // Show empty cart message if no items in cart
  if (cartProducts.length === 0) {
    return (
      <section className='max-w-2xl mx-auto my-16'>
        <div className='my-4 flex flex-col gap-4 items-center'>
          <p className='text-3xl font-semibold'>Your Shopping Cart is Empty</p>
          <Link href={'/menu'} className='text-primary_deep font-semibold'>
            <span>Continue shopping</span>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      <Link href={'/menu'} className='text-primary_deep font-semibold'>
        <ChevronLeftIcon className={'w-4 mr-2'} />
        <span>Continue shopping</span>
      </Link>
      {cartProducts.length > 0 &&
        <div className='grid grid-cols-5 mt-8 gap-12'>
          <div className='col-span-3'>
            <h2 className='border-b-1 font-semibold py-3 text-primary_deep'>Cart</h2>
            <div>
              {cartProducts && cartProducts.map((product, index) => (
                <CartProduct key={index} product={product}
                onRemove={() => removeCartProduct(index)} productPrice={calCartProductPrice(product)} />
              ))}
            </div>
            <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} discount={0} paid={false} />
          </div>
          <div className='col-span-2'>
            <h2 className='font-semibold py-3 text-primary_deep'>
              Check Out
            </h2>
            <div className='rounded-xl p-6 bg-gray-300'>
              <form className='flex flex-col gap-3 mt-3' onSubmit={proceedToCheckOut}>
                <div className="text-red-500 text-center font-medium mb-2">
                  We are only able to deliver to Lawrenceville, NJ
                </div>

                <div className="relative w-64 h-12 bg-gray-200 rounded-full flex items-center justify-between px-2">
                  <div
                  className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-md transition-all duration-300 ${
                    isDelivery ? "left-0" : "left-1/2"
                  }`}
                  ></div>
                  
                  <button 
                  type="button"
                  className={`relative z-10 w-1/2 text-center text-lg font-medium ${
                    isDelivery ? "text-black" : "text-gray-500"
                  }`}
                  onClick={() => setIsDelivery(true)}
                  >
                    Delivery
                    </button>
                    
                    <button 
                    type="button"
                    className={`relative z-10 w-1/2 text-center text-lg font-medium ${
                      !isDelivery ? "text-black" : "text-gray-500"
                    }`}
                    onClick={() => setIsDelivery(false)}
                    >
                      Pickup
                      </button>
                      </div>
                      
                      <div>
                        <label>Full Name:<span className="text-red-500">*</span></label>
                        <input
                        type="text"
                        value={address.userName || ''}
                        onChange={(e) => handleAddressChange('userName', e.target.value)}
                        className='input'
                        required
                        />
                      </div>


                      <div>
                        <label>Phone:<span className="text-red-500">*</span></label>
                        <input
                        type="text"
                        value={address.phone || ''}
                        onChange={(e) => handleAddressChange('phone', e.target.value)}
                        className='input'
                        required
                        />
                      </div>

                      {isDelivery && (
                      <AddressInputs
                      addressProps={{
                        ...address,
                        city: FIXED_ADDRESS.city,
                        state: FIXED_ADDRESS.state,
                        country: FIXED_ADDRESS.country,
                        postalCode: FIXED_ADDRESS.postalCode
                      }}
                      disabled={{
                        streetAddress: false,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true
                      }}
                      setAddressProps={handleAddressChange}
                      context="cart"
                      />
                      )}
                     <div className="text-grey-500 text-center font-medium mb-2">
                      Fields marked with <span className="text-red-500">*</span> are required
                      </div>

                      {error && <div className="text-red-500">{error}</div>}
                      <Button type='submit' color='primary' fullWidth>Pay ${(subtotal + deliveryFee).toFixed(2)}</Button>
              </form>
            </div>
          </div>
        </div>
      }
    </section>
  )
}

export default CartPage