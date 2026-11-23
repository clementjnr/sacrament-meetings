import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeetingAction } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params; const meetingId = Number(id);
 if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();
 const meeting = await getMeetingById(meetingId); if (!meeting) notFound();
 const action = updateMeetingAction.bind(null, meetingId);
 return <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="mb-2 text-2xl font-bold text-slate-900">Edit meeting</h2><p className="mb-7 text-slate-600">Update the meeting program details.</p><MeetingForm action={action} meeting={meeting} submitLabel="Save changes" /></section>;
}
