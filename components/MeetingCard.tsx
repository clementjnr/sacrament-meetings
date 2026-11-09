import Link from "next/link";
import type {SacramentMeeting} from "@/lib/types";
function formatDate(date:string){return new Intl.DateTimeFormat("en",{dateStyle:"long",timeZone:"UTC"}).format(new Date(`${date}T12:00:00Z`));}
export default function MeetingCard({meeting}:{meeting:SacramentMeeting}){return <Link className="meeting-card" href={`/meetings/${meeting.id}`}><span className="pill">{meeting.meetingType} meeting</span><h2>{formatDate(meeting.date)}</h2><p className="muted">Presiding: {meeting.presiding}</p><p className="muted">Conducting: {meeting.conducting}</p><span style={{color:"var(--brand)",fontWeight:700}}>View program →</span></Link>;}
