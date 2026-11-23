import Link from 'next/link';
import type { ReactNode } from 'react';
export default function AdminLayout({ children }: { children: ReactNode }) {
 return <div className="min-h-screen bg-slate-50"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5"><h1 className="text-lg font-bold text-slate-900">Meeting Administration</h1><Link href="/meetings" className="font-medium text-blue-800 hover:underline">View public meetings</Link></div></header><main className="mx-auto max-w-4xl px-4 py-8">{children}</main></div>;
}
