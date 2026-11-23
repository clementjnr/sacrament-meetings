import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';
export default function NewMeetingPage() {
 return <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="mb-2 text-2xl font-bold text-slate-900">Create a meeting</h2><p className="mb-7 text-slate-600">Enter the meeting program details below.</p><MeetingForm action={createMeeting} submitLabel="Create meeting" /></section>;
}
