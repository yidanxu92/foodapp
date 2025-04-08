import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { User } from "@/app/models/User";
import mongoose from "mongoose";
import MenuItemAddOn from "@/types/MenuItemAddOn";
import MenuItem from '@/types/MenuItem';

//make sure the type definition matches the User model
interface CartItem {
  menuItem: mongoose.Types.ObjectId | MenuItem;
  selectedSize: MenuItemAddOn | null;
  selectedExtras: MenuItemAddOn[];
  quantity: number;
  updatedAt: Date;
}

interface UserDocument {
  _id: mongoose.Types.ObjectId;
  email: string;
  cart: CartItem[];
}

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log("Successfully connected to MongoDB");
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // add more detailed error handling
    try {
      const user = await User.findOne({ email: session.user.email })
        .populate({
          path: 'cart.menuItem',
          strictPopulate: false,
          justOne: true
        })
        .lean() as unknown as UserDocument;

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // make sure cart exists, if not return empty array
      const cart = user.cart || [];
      
      console.log('Found user cart:', JSON.stringify(cart, null, 2));

      return NextResponse.json({ 
        success: true,
        cart: cart 
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        success: false,
        error: "Database error",
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Cart GET error details:', error);
    return NextResponse.json({ 
      success: false,
      error: "Server error",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cart } = await req.json();
    console.log('Received cart data:', cart);

    // make sure cart is an array
    if (!Array.isArray(cart)) {
      return NextResponse.json({ 
        success: false,
        error: "Invalid cart data"
      }, { status: 400 });
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: { cart: cart } },
        { new: true }
      )
      .populate({
        path: 'cart.menuItem',
        strictPopulate: false
      })
      .lean() as unknown as UserDocument;

      if (!updatedUser) {
        throw new Error('Failed to update user cart');
      }

      console.log('Updated user cart:', updatedUser.cart);

      return NextResponse.json({ 
        success: true,
        cart: updatedUser.cart
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        success: false,
        error: "Database error",
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Cart POST error:', error);
    return NextResponse.json({ 
      success: false,
      error: "Server error",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 