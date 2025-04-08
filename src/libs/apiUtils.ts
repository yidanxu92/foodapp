import { NextResponse } from 'next/server';

export function errorResponse(error: unknown, status = 500) {
  console.error('API error:', error);
  
  return NextResponse.json({ 
    success: false,
    error: "ServerError",
    message: error instanceof Error ? error.message : 'Unknown error occurred',
  }, { status });
}

export function successResponse(data: any, status = 200) {
  return NextResponse.json({ 
    success: true,
    ...data 
  }, { status });
} 