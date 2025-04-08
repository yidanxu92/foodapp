import mongoose from 'mongoose';
import { User } from '@/app/models/User';
import * as dotenv from 'dotenv';
import path from 'path';

//load env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function migrateUsers() {
  try {
    //check env
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    //connect to db
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    //get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to migrate`);

    for (const user of users) {
      if (user.cart && Array.isArray(user.cart)) {
        //add quantity field to each cart item
        const updatedCart = user.cart.map((item: any) => ({
          ...item,
          quantity: item.quantity || 1  // 如果没有 quantity，设为 1
        }));

        //update user's cart
        await User.updateOne(
          { _id: user._id },
          { $set: { cart: updatedCart } }
        );
        console.log(`Updated cart for user ${user.email}`);
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

//run migration
migrateUsers(); 