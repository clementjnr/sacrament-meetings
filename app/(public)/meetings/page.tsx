
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query ?? '';

  const requestedPage = Number(params.page) || 1;
  const currentPage = Math.max(1, requestedPage);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  const safeTotalPages = Math.max(1, totalPages);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Sacrament Meetings
        </h1>

        <p className="mt-2 text-slate-600">
          Browse current and past sacrament meeting programs.
        </p>
      </div>

      <MeetingSearch />

      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            No meetings found
          </h2>

          <p className="mt-2 text-slate-600">
            Try another search term.
          </p>
        </div>
      )}

      <Pagination totalPages={safeTotalPages} />
    </main>
  );
}

