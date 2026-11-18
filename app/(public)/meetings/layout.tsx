
import Link from 'next/link';

import type { ReactNode } from 'react';

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav
        aria-label="Meetings navigation"
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-4">
          <Link
            href="/meetings"
            className="font-semibold text-slate-800 hover:text-blue-700"
          >
            All Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="font-semibold text-slate-800 hover:text-blue-700"
          >
            Current Meeting
          </Link>
        </div>
      </nav>

      {children}
    </div>
  );
}
