
import { getMeetingById } from '@/lib/meetings-db';

import MeetingDetail from '@/components/MeetingDetail';

import { notFound } from 'next/navigation';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
