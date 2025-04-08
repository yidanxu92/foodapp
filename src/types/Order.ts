import type CartProduct from './CartProduct'

interface Order {
  _id: string
  userEmail: string
  cartProducts: CartProduct[]
  paid: boolean
  createdAt: string
  deliveryMethod:string
  userName:string
  streetAddress: string
  city: string
  state: string
  country: string
  postalCode: string
}

export default Order