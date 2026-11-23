'use client';

import { useActionState } from 'react';
import type { FormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

type FormAction = (state: FormState, formData: FormData) => Promise<FormState>;
const initialState: FormState = { message: '' };

export default function MeetingForm({ action, meeting, submitLabel }: { action: FormAction; meeting?: SacramentMeeting; submitLabel: string }) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const errors = state.errors ?? {};
  const value = (v?: string | number | null) => v ?? '';
  function fieldError(name: string) { return errors[name]?.[0]; }
  function input(name: string, label: string, defaultValue: string | number, type = 'text') {
    const error = fieldError(name);
    return <div className="space-y-1"><label htmlFor={name} className="block text-sm font-semibold text-slate-700">{label}</label><input id={name} name={name} type={type} defaultValue={defaultValue} aria-invalid={Boolean(error)} aria-describedby={`${name}-error`} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"/><p id={`${name}-error`} aria-live="polite" className="min-h-5 text-sm text-red-700">{error ?? ''}</p></div>;
  }
  function textarea(name: string, label: string, defaultValue: string) {
    const error = fieldError(name);
    return <div className="space-y-1"><label htmlFor={name} className="block text-sm font-semibold text-slate-700">{label}</label><textarea id={name} name={name} rows={3} defaultValue={defaultValue} aria-invalid={Boolean(error)} aria-describedby={`${name}-error`} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"/><p id={`${name}-error`} aria-live="polite" className="min-h-5 text-sm text-red-700">{error ?? ''}</p></div>;
  }
  return <form action={formAction} className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2">
      {input('date','Meeting date',value(meeting?.date) as string,'date')}
      <div className="space-y-1"><label htmlFor="meetingType" className="block text-sm font-semibold text-slate-700">Meeting type</label><select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? 'regular'} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900"><option value="testimony">Testimony</option><option value="regular">Regular</option><option value="stake">Stake</option><option value="general">General</option><option value="special">Special</option></select><p id="meetingType-error" aria-live="polite" className="min-h-5 text-sm text-red-700">{fieldError('meetingType') ?? ''}</p></div>
      {input('presiding','Presiding',value(meeting?.presiding) as string)}
      {input('conducting','Conducting',value(meeting?.conducting) as string)}
    </div>
    {textarea('announcements','Announcements (one per line)',(meeting?.announcements ?? []).join('\n'))}
    <div className="grid gap-4 sm:grid-cols-2">{input('openingHymnNumber','Opening hymn number',value(meeting?.openingHymn.number ?? '') as string,'number')}{input('openingHymnTitle','Opening hymn title',value(meeting?.openingHymn.title) as string)}{input('openingPrayer','Opening prayer',value(meeting?.openingPrayer) as string)}</div>
    {textarea('wardBusiness','Ward business (one item per line)',(meeting?.wardBusiness ?? []).map(x=>x.description).join('\n'))}
    <div className="space-y-1"><label htmlFor="stakeBusiness" className="block text-sm font-semibold text-slate-700">Stake business scheduled?</label><select id="stakeBusiness" name="stakeBusiness" defaultValue={String(meeting?.stakeBusiness ?? false)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900"><option value="false">No</option><option value="true">Yes</option></select><p id="stakeBusiness-error" aria-live="polite" className="min-h-5 text-sm text-red-700">{fieldError('stakeBusiness') ?? ''}</p></div>
    <div className="grid gap-4 sm:grid-cols-2">{input('sacramentHymnNumber','Sacrament hymn number',value(meeting?.sacramentHymn.number ?? '') as string,'number')}{input('sacramentHymnTitle','Sacrament hymn title',value(meeting?.sacramentHymn.title) as string)}{input('closingHymnNumber','Closing hymn number',value(meeting?.closingHymn.number ?? '') as string,'number')}{input('closingHymnTitle','Closing hymn title',value(meeting?.closingHymn.title) as string)}{input('closingPrayer','Closing prayer',value(meeting?.closingPrayer) as string)}</div>
    {textarea('speakers','Speakers / musical numbers (one per line: Name | Topic | speaker or musical-number)',(meeting?.speakers ?? []).map(x=>`${x.name} | ${x.topic} | ${x.type}`).join('\n'))}
    <p className="text-sm text-slate-600">For a musical number, use <strong>musical-number</strong> as the final value. For a speaker, use <strong>speaker</strong>.</p>
    <div aria-live="polite" role="status" className="text-sm font-medium text-red-700">{state.message}</div>
    <button type="submit" disabled={isPending} className="rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900 disabled:cursor-wait disabled:opacity-60">{isPending ? 'Saving…' : submitLabel}</button>
  </form>;
}
