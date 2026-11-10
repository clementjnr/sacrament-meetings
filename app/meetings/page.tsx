
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import { getApiBaseUrl } from "@/lib/api-url";

export const dynamic = "force-dynamic";

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const base = await getApiBaseUrl();

  const response = await fetch(`${base}/api/meetings`, {
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok || !contentType.includes("application/json")) {
    const body = await response.text();

    console.error("Meetings API error:", {
      url: `${base}/api/meetings`,
      status: response.status,
      contentType,
      body: body.slice(0, 500),
    });

    throw new Error("Unable to load meeting programs from the API.");
  }

  return response.json() as Promise<SacramentMeeting[]>;
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

