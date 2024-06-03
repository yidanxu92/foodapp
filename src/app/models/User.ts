import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
  name: string;
  email?: string;
  password: string;
  image: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  image: { type: String, required: false },
  phone: { type: String, required: false },
  streetAddress: { type: String, required: false },
  postalCode: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
