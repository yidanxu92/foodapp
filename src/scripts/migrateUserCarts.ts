import mongoose from 'mongoose';
import { User } from '@/app/models/User';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function migrateUserCarts() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to process`);
    
    let updatedCount = 0;

    // Process each user
    for (const user of users) {
      let needsUpdate = false;
      
      // Check if user has a cart
      if (user.cart && Array.isArray(user.cart)) {
        // Add quantity field to each cart item if missing
        const updatedCart = user.cart.map((item: any) => ({
          ...item,
          quantity: item.quantity || 1  // If quantity is missing, set to 1
        }));
        
        // Check if any items were updated
        if (JSON.stringify(updatedCart) !== JSON.stringify(user.cart)) {
          user.cart = updatedCart;
          needsUpdate = true;
        }
      } else {
        // If cart is missing or not an array, initialize it
        user.cart = [];
        needsUpdate = true;
      }
      
      // Save user if updates were made
      if (needsUpdate) {
        await user.save();
        updatedCount++;
        console.log(`Updated user ${user.email}`);
      }
    }

    console.log(`Migration complete. Updated ${updatedCount} users.`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
migrateUserCarts(); 