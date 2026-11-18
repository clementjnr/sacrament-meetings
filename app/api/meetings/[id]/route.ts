
import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
      return NextResponse.json(
        { message: 'Invalid meeting ID.' },
        { status: 400 }
      );
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
      return NextResponse.json(
        { message: 'Meeting not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(meeting, {
      status: 200,
    });
  } catch (error) {
    console.error('Error retrieving meeting:', error);

    return NextResponse.json(
      { message: 'Unable to retrieve meeting.' },
      { status: 500 }
    );
  }
}
