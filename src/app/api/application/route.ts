import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, position, message } = body;

    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { error: 'Name, email, phone, and position are required' },
        { status: 400 }
      );
    }

    const application = new Application({
      name,
      email,
      phone,
      position,
      message,
    });

    await application.save();

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

