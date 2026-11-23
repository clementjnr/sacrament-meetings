'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { addMeeting, updateMeeting, deleteMeeting } from '@/lib/meetings-db';
import type { MeetingType, SacramentMeeting, SpeakerItem, WardBusinessItem } from '@/lib/types';

export type FormState = { message: string; errors?: Record<string, string[]> };
const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid meeting date.'),
  meetingType: z.enum(['testimony','regular','stake','general','special']),
  presiding: z.string().trim().min(2, 'Enter the presiding leader.').max(255),
  conducting: z.string().trim().min(2, 'Enter the conducting leader.').max(255),
  announcements: z.string().optional().default(''),
  openingHymnNumber: z.coerce.number().int().positive('Enter a valid hymn number.'),
  openingHymnTitle: z.string().trim().min(2, 'Enter the opening hymn title.'),
  openingPrayer: z.string().trim().min(2, 'Enter the opening prayer name.'),
  wardBusiness: z.string().optional().default(''),
  stakeBusiness: z.enum(['true','false']),
  sacramentHymnNumber: z.coerce.number().int().positive('Enter a valid hymn number.'),
  sacramentHymnTitle: z.string().trim().min(2, 'Enter the sacrament hymn title.'),
  speakers: z.string().optional().default(''),
  closingHymnNumber: z.coerce.number().int().positive('Enter a valid hymn number.'),
  closingHymnTitle: z.string().trim().min(2, 'Enter the closing hymn title.'),
  closingPrayer: z.string().trim().min(2, 'Enter the closing prayer name.'),
});

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}
function toMeetingData(value: z.infer<typeof MeetingFormSchema>): Omit<SacramentMeeting, 'id'> {
  const speakers: SpeakerItem[] = value.speakers.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
    const [name, topic = '', kind = 'speaker'] = line.split('|').map(x => x.trim());
    return { name, topic, type: kind.toLowerCase() === 'musical-number' ? 'musical-number' : 'speaker' };
  });
  const wardBusiness: WardBusinessItem[] = value.wardBusiness.split('\n').map(x => x.trim()).filter(Boolean).map(description => ({ description }));
  return {
    date: value.date, meetingType: value.meetingType as MeetingType, presiding: value.presiding, conducting: value.conducting,
    announcements: value.announcements.split('\n').map(x => x.trim()).filter(Boolean),
    openingHymn: { number: value.openingHymnNumber, title: value.openingHymnTitle }, openingPrayer: value.openingPrayer,
    wardBusiness, stakeBusiness: value.stakeBusiness === 'true',
    sacramentHymn: { number: value.sacramentHymnNumber, title: value.sacramentHymnTitle }, speakers,
    closingHymn: { number: value.closingHymnNumber, title: value.closingHymnTitle }, closingPrayer: value.closingPrayer,
  };
}
function validate(formData: FormData) {
  return MeetingFormSchema.safeParse(formDataToObject(formData));
}

export async function createMeeting(prevState: FormState, formData: FormData): Promise<FormState> {
  void prevState;
  const parsed = validate(formData);
  if (!parsed.success) return { message: 'Please correct the highlighted fields.', errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  try {
    await addMeeting(toMeetingData(parsed.data));
  } catch (error) {
    console.error('createMeeting failed:', error);
    return { message: 'The meeting could not be saved. Please try again.' };
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeetingAction(id: number, prevState: FormState, formData: FormData): Promise<FormState> {
  void prevState;
  const parsed = validate(formData);
  if (!parsed.success) return { message: 'Please correct the highlighted fields.', errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  try {
    const updated = await updateMeeting(id, toMeetingData(parsed.data));
    if (!updated) return { message: 'This meeting no longer exists. Return to the meetings list.' };
  } catch (error) {
    console.error('updateMeeting failed:', error);
    return { message: 'The meeting could not be updated. Please try again.' };
  }
  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeetingAction(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));
  if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid meeting ID.');
  try {
    const deleted = await deleteMeeting(id);
    if (!deleted) throw new Error('Meeting not found.');
  } catch (error) {
    console.error('deleteMeeting failed:', error);
    throw new Error('The meeting could not be deleted. Please try again.');
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}
