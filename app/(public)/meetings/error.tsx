'use client';
import Link from 'next/link';
export default function MeetingsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
 return <main className="mx-auto max-w-xl px-4 py-16 text-center"><h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1><p className="my-3 text-slate-600">We could not load the meeting information. Please try again.</p>{process.env.NODE_ENV === 'development' && <p className="mb-4 text-sm text-red-700">{error.message}</p>}<div className="flex justify-center gap-3"><button onClick={() => reset()} className="rounded-lg bg-blue-800 px-4 py-2 text-white">Try again</button><Link href="/meetings" className="rounded-lg border border-slate-300 px-4 py-2">All meetings</Link></div></main>;
}
