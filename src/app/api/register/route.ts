import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "../../../app/models/User";
import bcryptjs from "bcryptjs";
import rateLimit from "@/libs/rateLimit";
import { z } from "zod";
import { errorResponse, successResponse } from '@/libs/apiUtils';


const limiter = rateLimit(5, 60 * 1000);

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be less than 50 characters."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character (!@#$%^&*)."),
});


async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState !== 1) {
      if (!process.env.MONGODB_URI) {
        throw new Error("did not set MONGODB_URI");
      }
      
      await mongoose.connect(process.env.MONGODB_URI);
   
    }
  } catch (error) {
    console.log("connect to database failed", error);
    throw new Error("connect to database failed");
  }
}

export const POST = async (req: NextRequest) => {
  try {
    
    await connectToDatabase();

    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: result.error.errors.map(err => err.message).join(", ")
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;
    
    if (limiter.check(email)) {
      return NextResponse.json({
        error: "RateLimitError",
        message: "Too many requests, please try again later"
      }, { status: 429 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: "DuplicateError",
        message: "this email has been registered"
      }, { status: 400 });
    }

    
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      cart: []
    });

    return successResponse({ message: "register success" }, 201);

  } catch (err) {
    return errorResponse(err);
  }
};