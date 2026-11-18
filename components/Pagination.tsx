
'use client';

import Link from 'next/link';

import {
  usePathname,
  useSearchParams,
} from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Math.max(
    1,
    Number(searchParams.get('page')) || 1
  );

  function createPageURL(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set('page', String(page));

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400"
        >
          Previous
        </span>
      )}

      <span
        className="text-sm font-semibold text-slate-800"
        aria-live="polite"
      >
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400"
        >
          Next
        </span>
      )}
    </nav>
  );
}
