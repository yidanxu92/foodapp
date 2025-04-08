import { Schema, model, models } from "mongoose";
import bcryptjs from 'bcryptjs';
import CartProduct from "@/types/CartProduct";
import mongoose from "mongoose";

/*const CartProductSchema = new Schema({
  menuItem: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    sizes: { type: Array, default: [] },
    extraIngredientsPrices: { type: Array, default: [] }
  },
  selectedSize: {
    type: Schema.Types.Mixed,
    default: null
  },
  selectedExtras: {
    type: [Schema.Types.Mixed],
    default: []
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24
  }
}, { _id: false });*/

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  cart:{
    menuItem: mongoose.Types.ObjectId; // Reference to the MenuItem model
    selectedSize: any; // Mixed type for flexibility
    selectedExtras: any[]; // Array for selected extras
    quantity: number; // Quantity of the product
    updatedAt: Date; // Timestamp for the cart item
  }[];
}

// Cart schema definition
const CartSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true }, // Reference to MenuItem model
  selectedSize: { type: Schema.Types.Mixed, default: null }, // Flexible type for selected size
  selectedExtras: { type: [Schema.Types.Mixed], default: [] }, // Array of selected extras
  quantity: { type: Number, required: true, min: 1, max: 10, default: 1 }, // Minimum and maximum quantity
  updatedAt: { type: Date, default: Date.now }, // Timestamp for the cart item
}, { _id: false }); // No separate ObjectId for cart items

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  phone: { type: String },
  streetAddress: { type: String },
  postalCode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  isAdmin: { type: Boolean, default: false },
  cart: {
    type: [CartSchema],
    default: []
  }
}, {
  timestamps: true,
  strict: false
});

/*UserSchema.post('validate', function (user) {
  if (user.password && user.password.length >= 8) {
    const unHashedPassword = user.password;
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(unHashedPassword, salt);
  }
})*/

// Middleware: Hash password before saving
/*
UserSchema.pre('save', async function (next) {
  const user = this as any;
  if (user.isModified('password') && user.password.length >= 8) {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
  }
  next();
});
*/

export const User = models?.User || model('User', UserSchema);
