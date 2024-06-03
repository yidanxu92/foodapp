import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "../../../app/models/User";

// 连接 MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    // 连接 Mongoose
    await connectToDatabase();

    const createdUser = await User.create(body);

    return NextResponse.json(createdUser,{status:201});
  } catch (err: any) {
    console.error('Error:', err); // 添加错误日志输出，方便查看错误信息
    if (err.name === "ValidationError") {
      return NextResponse.json({
        error: err.name,
        message: "Error: Password must be at least 8 characters.",
      });
    } else if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json({
        error: err.name,
        message: "Error: Account with this email already exists.",
      },{status:400});
    } else {
      return NextResponse.json({
        error: err.name,
        message: "An unexpected error occurred.",
      },{status:500});
    }
  }
};