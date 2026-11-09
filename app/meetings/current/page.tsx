import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";
function mostRecentSunday():string{const today=new Date();const sunday=new Date(today);sunday.setDate(today.getDate()-today.getDay());return `${sunday.getFullYear()}-${String(sunday.getMonth()+1).padStart(2,"0")}-${String(sunday.getDate()).padStart(2,"0")}`;}
export default function CurrentMeetingPage(){const meeting=getMeetings(mostRecentSunday())[0];if(meeting)redirect(`/meetings/${meeting.id}`);redirect("/meetings");}
