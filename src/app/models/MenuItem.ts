import { Schema, model, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number
})

const MenuItemSchema = new Schema({
  name: { type: String },
  image: { type: String },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  basePrice: { type: Number },
  sizes: { type: [ExtraPriceSchema] },
  extraIngredientsPrices: { type: [ExtraPriceSchema] },
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);