
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import { getApiBaseUrl } from "@/lib/api-url";

export const dynamic = "force-dynamic";

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const base = await getApiBaseUrl();

  const response = await fetch(`${base}/api/meetings`, {
    cache: "no-store",
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Meetings API failed: ${response.status}. ${responseText.slice(0, 200)}`
    );
  }

  let meetings: unknown;

  try {
    meetings = JSON.parse(responseText);
  } catch {
    throw new Error(
      `Meetings API returned non-JSON content. URL: ${base}/api/meetings. Response: ${responseText.slice(0, 200)}`
    );
  }

  if (!Array.isArray(meetings)) {
    throw new Error("Meetings API did not return an array.");
  }

  return meetings as SacramentMeeting[];
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <section className="content-width page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Meeting archive</span>
          <h1>Meeting programs</h1>
          <p className="muted">
            Browse current and past Sunday programs.
          </p>
        </div>
      </div>

      {meetings.length > 0 ? (
        <div className="meeting-grid">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No meeting programs have been added yet.
        </p>
      )}
    </section>
  );
}

