import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/User";

export async function POST(req: NextRequest) {
  try {
    // Verify request
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== process.env.CLEANUP_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Calculate expiration date (e.g., 7 days ago)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() - 7);

    // Clean up expired cart items
    const result = await User.updateMany(
      { "cart.updatedAt": { $lt: expiryDate } },
      { $pull: { cart: { updatedAt: { $lt: expiryDate } } } }
    );

    return NextResponse.json({ 
      success: true,
      cleanedCount: result.modifiedCount
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: "Server error"
    }, { status: 500 });
  }
} 