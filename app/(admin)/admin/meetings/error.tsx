'use client';
import Link from 'next/link';
export default function AdminMeetingsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main className="mx-auto max-w-xl p-10 text-center"><h1 className="text-2xl font-bold">Unable to complete that action</h1><p className="my-3 text-slate-600">An unexpected error occurred. Try again or return to the meetings list.</p><button onClick={reset} className="mr-3 rounded-lg bg-blue-800 px-4 py-2 text-white">Try again</button><Link href="/meetings" className="underline">Meetings</Link></main>; }
