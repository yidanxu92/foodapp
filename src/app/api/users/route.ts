import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
//import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    /*if (await isAdmin()) {
      const users = await User.find();
      return NextResponse.json(users);
    } else {
      return NextResponse.json([]);
    }*/
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
