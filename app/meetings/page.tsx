import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import { getApiBaseUrl } from "@/lib/api-url";
export const dynamic = "force-dynamic";
async function fetchMeetings():Promise<SacramentMeeting[]>{const base=await getApiBaseUrl();const response=await fetch(`${base}/api/meetings`,{cache:"no-store"});if(!response.ok)throw new Error("Unable to load meeting programs.");return response.json() as Promise<SacramentMeeting[]>;}
export default async function MeetingsPage(){const meetings=await fetchMeetings();return <section className="content-width page-section"><div className="section-heading"><div><span className="eyebrow">Meeting archive</span><h1>Meeting programs</h1><p className="muted">Browse current and past Sunday programs.</p></div></div>{meetings.length?<div className="meeting-grid">{meetings.map(m=><MeetingCard key={m.id} meeting={m}/>)}</div>:<p className="empty-state">No meeting programs have been added yet.</p>}</section>;}
