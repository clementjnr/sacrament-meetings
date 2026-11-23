import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { deleteMeetingAction } from '@/lib/actions';
function formatDate(date: string) { return new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`)); }
export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
 return <article className="meeting-card"><Link href={`/meetings/${meeting.id}`} className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"><span className="pill">{meeting.meetingType} meeting</span><h2>{formatDate(meeting.date)}</h2><p className="muted">Presiding: {meeting.presiding}</p><p className="muted">Conducting: {meeting.conducting}</p><span className="font-bold text-blue-800">View program →</span></Link><div className="mt-4 flex gap-3 border-t border-slate-100 pt-3"><Link href={`/admin/meetings/${meeting.id}/edit`} className="text-sm font-semibold text-blue-800 underline">Edit</Link><form action={deleteMeetingAction}><input type="hidden" name="id" value={meeting.id}/><button type="submit" className="text-sm font-semibold text-red-700 underline">Delete</button></form></div></article>;
}
