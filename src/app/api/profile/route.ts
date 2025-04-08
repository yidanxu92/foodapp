import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

// Define ProfileUpdateData type
interface ProfileUpdateData {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  isAdmin?: boolean;
}

//connect to database
async function connectDB() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }
  } catch (error) {
    throw new Error('database connection failed');
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json() as ProfileUpdateData;
    
    if (data._id) { // update other user
      const updatedUser = await User.findByIdAndUpdate(
        { _id: data._id }, 
        data, 
        { new: true }
      );
      return NextResponse.json(updatedUser);
    } else { // update current user
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      const updatedUser = await User.findOneAndUpdate(
        { email }, 
        data, 
        { new: true }
      );
      return NextResponse.json(updatedUser);
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update profile" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const profile = await User.findOne({ email });

    return NextResponse.json(profile);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch profile" }, 
      { status: 500 }
    );
  }
}