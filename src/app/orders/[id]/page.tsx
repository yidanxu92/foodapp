'use client'
import AddressInputs from '@/components/common/form/AddressInputs'
import CartProduct from '@/components/features/cart/CartProduct'
import { useProfile } from '@/components/hooks/useProfile'
import type { ProfileData } from '@/components/hooks/useProfile'
import OrderSummary from '@/components/features/cart/OrderSummary'
import { CartContext, calCartProductPrice } from '@/util/ContextProvider'
import { TickIcon } from '@/icons/TickIcon'
import CartProductInfo from '@/types/CartProduct'
import Order from '@/types/Order'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Loader from "@/components/common/Loader";

const OrderPage = () => {
  const { id } = useParams();
  const { clearCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<Partial<ProfileData>>({});
  const { data: profileData } = useProfile();


  useEffect(() => {
    if (profileData) {
      const { name, phone, streetAddress, city, state, country, postalCode } = profileData;
      setAddress({ userName: name, phone, streetAddress, city, state, country, postalCode });
    }
  }, [profileData])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        setShowMessage(true);
        clearCart();
      }
    };

    if (id) {
      fetch(`/api/orders?_id=${id}`)
        .then(res => res.json())
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching order:', error);
          setLoading(false);
        });
    }
  }, [id])

  useEffect(() => {
    if (order) {
      console.log('Order delivery method:', order.deliveryMethod);
    }
  }, [order]);

  let subtotal = 0;
  if (order?.cartProducts) {
    order?.cartProducts.forEach(cartProduct => {
      subtotal += calCartProductPrice(cartProduct) as number;
    });
  }

  if (loading) {
    return <Loader className={""} />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {showMessage &&
        <div className='text-2xl font-semibold text-primary justify-center italic mb-6 flex gap-2 items-center'>
          <TickIcon className={'w-16'} />
          Order Submitted
        </div>
      }
      <Breadcrumbs size='lg'>
        <BreadcrumbItem href='/orders'>Orders</BreadcrumbItem>
        <BreadcrumbItem>ID {id}</BreadcrumbItem>
      </Breadcrumbs>
      <div>
        {order && (
          <div className='grid grid-cols-5 mt-8 gap-12'>
            <div className='col-span-3'>
              <h2 className='border-b-1 font-semibold py-3 text-primary'>Order Details </h2>
              {order.cartProducts.map((product: CartProductInfo, index: number) => (
                <CartProduct key={index} product={product} productPrice={calCartProductPrice(product)} />
              ))}
              <OrderSummary orderId={order._id} subtotal={subtotal} deliveryFee={order.deliveryMethod === 'delivery' ? 5 : 0}  discount={0} paid={order.paid} />
            </div>
            <div className='col-span-2'>
              <h2 className='font-semibold py-3 text-primary'>Delivery Information</h2>
              <div className='rounded-xl p-4 shadow-xl bg-gray-300'>

              <div>
                        <label>Full Name:</label>
                        <input
                        type="text"
                        value={address.name || address.userName || ''}
                        className='input'
                        required
                        disabled={true}
                        />
                      </div>


                      <div>
                        <label>Phone:</label>
                        <input
                        type="text"
                        value={address.phone || ''}
                        disabled={true}
                        className='input'
                        required
                        />
                      </div>
                <div>
                  {order.deliveryMethod === 'delivery' && (
                    <AddressInputs
                      addressProps={order}
                      setAddressProps={() => {}}
                      disabled={{
                        streetAddress: true,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true
                      }}
                      context="orders"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default OrderPage;