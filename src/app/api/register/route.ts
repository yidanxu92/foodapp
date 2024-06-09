import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "../../../app/models/User";
import bcrypt from 'bcrypt';

// 连接 MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as mongoose.ConnectOptions);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Error connecting to MongoDB");
    }
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

     // 检查请求体是否包含必需的字段
     if (!name || !email || !password) {
      return NextResponse.json({
        error: "ValidationError",
        message: "Name, email, and password are required."
      }, { status: 400 });
    }
   

    // 连接 Mongoose
    await connectToDatabase();

    // 检查用户是否已经存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: "MongoServerError",
        message: "Error: Account with this email already exists."
      }, { status: 400 });
    }

    // 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // 保存用户到数据库
    const createdUser = await newUser.save();

    return NextResponse.json(createdUser,{status:201});
  } catch (err: any) {
    console.error('Error:', err); // 添加错误日志输出，方便查看错误信息
    
    if (err.name === "ValidationError") {
      return NextResponse.json({
        error: err.name,
        message: "Error: Password must be at least 8 characters.",
      },{ status: 400 });

    } else if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json({
        error: err.name,
        message: "Error: Account with this email already exists.",
      },{status:400});
    } else if (err.message === "Error connecting to MongoDB") {
      return NextResponse.json({
        error:err.name,
        message:"Error connecting to the database."
      },{status:500});
    }else{
      return NextResponse.json({
        error: err.name,
        message: "An unexpected error occurred.",
      },{status:500});   
    }
  }
};