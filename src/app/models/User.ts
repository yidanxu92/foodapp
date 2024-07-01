import { Schema, model, models } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: (password: string) => {
      if (!password.length || password.length < 8) {
        new Error('Password must be at least 8 characters');
        return false;
      }
    }
  },
  image: { type: String },
  phone: { type: String },
  streetAddress: { type: String },
  postalCode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.post('validate', function (user) {
  const unHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(unHashedPassword, salt);
})

export const User = models?.User || model('User', UserSchema);



/*import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
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
*/