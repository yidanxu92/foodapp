import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
import { isAdmin } from "@/libs/admin";

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }
    
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await User.find({}, 'name email image phone isAdmin createdAt updatedAt');


    return NextResponse.json(users);

  } catch (error) {
    console.error("Error in users API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
