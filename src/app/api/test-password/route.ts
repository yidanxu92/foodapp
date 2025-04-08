import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const { email, password } = await req.json();
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    
    return NextResponse.json({
      success: true,
      passwordMatch,
      userExists: true,
      hashedPassword: user.password,
      providedPassword: password
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
} 