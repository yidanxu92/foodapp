import mongoose, { models } from "mongoose";

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String },
  phone: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  cartProducts: { type: Object } ,
  deliveryMethod: { type: String },
  deliveryFee: { type: Number},
  paid: { type: Boolean, default: false },
}, { timestamps: true });

/*if order model already exists, delete it*/
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

export const Order = models?.Order || mongoose.model("Order", OrderSchema);