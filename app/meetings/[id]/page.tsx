import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";
import { getApiBaseUrl } from "@/lib/api-url";
export const dynamic = "force-dynamic";
async function fetchMeeting(id:string):Promise<SacramentMeeting|null>{const base=await getApiBaseUrl();const response=await fetch(`${base}/api/meetings/${encodeURIComponent(id)}`,{cache:"no-store"});if(response.status===404)return null;if(!response.ok)throw new Error("Unable to load this meeting.");return response.json() as Promise<SacramentMeeting>;}
export default async function MeetingPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const meeting=await fetchMeeting(id);if(!meeting)notFound();return <MeetingDetail meeting={meeting}/>;}
