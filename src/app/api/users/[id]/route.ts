import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { isAdmin } from "@/libs/admin";


interface UserDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any; 
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

  
    const user = await User.findById(params.id).lean() as UserDocument;

    if (user && !Array.isArray(user)) {
      const formattedUser = {
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt?.toISOString(),
        updatedAt: user.updatedAt?.toISOString(),
      };

      return NextResponse.json(formattedUser);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

  } catch (error) {
    console.error("Error in user API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 