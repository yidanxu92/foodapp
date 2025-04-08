import mongoose from 'mongoose';
import { User } from '@/app/models/User';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function cleanupCarts() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Set cleanup conditions: e.g., cart items not updated for more than 7 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);

    // Find all users
    const users = await User.find({ 'cart.0': { $exists: true } });
    console.log(`Found ${users.length} users with non-empty carts`);
    
    let updatedCount = 0;

    // Iterate through users and clean up their carts
    for (const user of users) {
      // Filter out old cart items
      const originalLength = user.cart.length;
      user.cart = user.cart.filter((item: any) => {
        return item.updatedAt && new Date(item.updatedAt) > cutoffDate;
      });

      // If cart has changed, save the user
      if (originalLength !== user.cart.length) {
        await user.save();
        updatedCount++;
        console.log(`Cleaned cart for user ${user.email}, removed ${originalLength - user.cart.length} items`);
      }
    }

    console.log(`Cleanup complete. Updated ${updatedCount} users.`);

  } catch (error) {
    console.error('Cleanup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the cleanup
cleanupCarts(); 