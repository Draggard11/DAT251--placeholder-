import React, { useEffect, useState } from "react";
import CreateSessionModal from "../components/CreateSessionModal";
import SessionCard from "../components/SessionCard";
import type { StudySessionItem } from "../types/studySession";

const StudySession = () => {
  const [selectedSession, setSelectedSession] =
    useState<StudySessionItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<StudySessionItem[]>([]);
  const [sessionType, setSessionType] = useState<"personal" | "group">(
    "personal"
  );
  const [selectedGroup, setSelectedGroup] = useState<null | {
    id: string;
    name: string;
    subject: string;
  }>(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/studySessions");
      const data = await res.json();

      setSessions(
        data.map((session: any) => ({
          id: String(session.id),
          subject: session.subject ?? "",
          date: session.startTime ? session.startTime.split("T")[0] : "",
          startTime: session.startTime,
          endTime: session.endTime,
          completed: session.completed ?? false,
          location: session.location ?? "",
          type: session.studyGroup ? "group" : "personal",
          groupId: session.studyGroup
            ? String(session.studyGroup.id)
            : undefined,
          groupName: session.studyGroup ? session.studyGroup.name : undefined,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const getSessionStatus = (session: StudySessionItem) => {
    const now = new Date();
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);

    if (session.completed || now > end) return "completed";
    if (now >= start && now <= end) return "active";
    return "upcoming";
  };

  const personalSessions = sessions.filter((s) => s.type === "personal");
  const groupSessions = sessions.filter((s) => s.type === "group");

  const personalActive = personalSessions.filter(
    (s) => getSessionStatus(s) === "active"
  );
  const personalUpcoming = personalSessions.filter(
    (s) => getSessionStatus(s) === "upcoming"
  );
  const personalCompleted = personalSessions.filter(
    (s) => getSessionStatus(s) === "completed"
  );

  const groupUpcoming = groupSessions.filter(
    (s) => getSessionStatus(s) === "upcoming"
  );
  const groupCompleted = groupSessions.filter(
    (s) => getSessionStatus(s) === "completed"
  );
  const groupActive = groupSessions.filter(
    (s) => getSessionStatus(s) === "active"
  );

  const handleSaveSession = async (newSession: StudySessionItem) => {
    try {
      const start = new Date(`${newSession.date}T${newSession.startTime}:00`);
      const end = new Date(`${newSession.date}T${newSession.endTime}:00`);

      let res: Response;

      if (selectedSession) {
        res = await fetch(
          `http://localhost:8080/api/studySessions/${selectedSession.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: newSession.subject,
              startTime: start.toISOString(),
              endTime: end.toISOString(),
              location: newSession.location,
              completed: false,
              studyGroupId: newSession.groupId
                ? Number(newSession.groupId)
                : null,
            }),
          }
        );
      } else {
        res = await fetch("http://localhost:8080/api/studySessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: newSession.subject,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            location: newSession.location,
            completed: false,
            studyGroup: newSession.groupId
              ? { id: Number(newSession.groupId) }
              : null,
          }),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to save session");
      }

      await fetchSessions();
      setIsOpen(false);
      setSelectedSession(null);
      setSelectedGroup(null);
      setSessionType("personal");
    } catch (err) {
      console.error("Failed to save session:", err);
    }
  };

  const handleRemoveSession = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/studySessions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      await fetchSessions();
    } catch (err) {
      console.error("Failed to delete session:", err);
    }
  };

  const handleEditSession = (session: StudySessionItem) => {
    setSelectedSession(session);
    setSessionType(session.type);
    setSelectedGroup(
      session.groupId && session.groupName
        ? {
            id: session.groupId,
            name: session.groupName,
            subject: session.subject,
          }
        : null
    );
    setIsOpen(true);
  };

  const gridStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    alignItems: "center",
  };

  const renderSessionSection = (
    title: string,
    items: StudySessionItem[],
    emptyText: string,
    color: string
  ) => (
    <div
      style={{
        backgroundColor: color,
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "16px",
        minHeight: "150px",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>{title}</h3>
      {items.length === 0 ? (
        <div
          style={{
            padding: "16px",
            border: "1px dashed #ccc",
            borderRadius: "12px",
            color: "#666",
            backgroundColor: "#fafafa",
          }}
        >
          {emptyText}
        </div>
      ) : (
        <div
          style={{ ...gridStyle, alignItems: "center", justifyItems: "center" }}
        >
          {items.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onEdit={handleEditSession}
              onRemove={handleRemoveSession}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        padding: "40px 32px",
        width: "100%",
        margin: "0 auto",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px" }}
      >
        <section style={{ marginBottom: "48px", textAlign: "center" }}>
          <h1 style={{ marginBottom: "12px", fontSize: "40px" }}>
            Study Session
          </h1>
          <p style={{ margin: 0, color: "#666", fontSize: "18px" }}>
            Create and manage your own study sessions to stay structured and
            consistent.
          </p>
        </section>

        <section
          style={{
            marginBottom: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: "24px",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
            Create a session
          </h2>
          <p style={{ marginTop: 0, color: "#666", marginBottom: "20px" }}>
            Start by creating a personal study session with a subject and time.
          </p>

          <div
            onClick={() => {
              setSessionType("personal");
              setSelectedGroup(null);
              setSelectedSession(null);
              setIsOpen(true);
            }}
            style={{
              marginTop: "20px",
              width: "220px",
              height: "140px",
              border: "2px dashed #ccc",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1f2d3d";
              e.currentTarget.style.backgroundColor = "#f0f2f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#ccc";
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              +
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: "8px" }}>Your sessions</h2>
          <p style={{ marginTop: 0, color: "#666", marginBottom: "20px" }}>
            Here you can see the study sessions you have already created.
          </p>

          {sessions.length === 0 ? (
            <div
              style={{
                marginBottom: "48px",
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                padding: "24px",
              }}
            >
              No study sessions yet. Create your first one above.
            </div>
          ) : (
            <div
              style={{
                marginBottom: "48px",
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                }}
              >
                <div>
                  <h2 style={{ marginBottom: "20px" }}>
                    Personal study sessions
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "24px",
                      alignItems: "start",
                    }}
                  >
                    {renderSessionSection(
                      "Active session",
                      personalActive,
                      "No active personal session right now.",
                      "#fff4e5"
                    )}
                    {renderSessionSection(
                      "Upcoming sessions",
                      personalUpcoming,
                      "No upcoming personal sessions.",
                      "#e8f1ff"
                    )}
                    {renderSessionSection(
                      "Completed sessions",
                      personalCompleted,
                      "No completed personal sessions yet.",
                      "#e6f7ee"
                    )}
                  </div>
                </div>

                <div>
                  <h2 style={{ marginBottom: "20px" }}>Group study sessions</h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "24px",
                      alignItems: "start",
                    }}
                  >
                    {renderSessionSection(
                      "Active group sessions",
                      groupActive,
                      "No active group sessions yet.",
                      "#fff4e5"
                    )}
                    {renderSessionSection(
                      "Upcoming group sessions",
                      groupUpcoming,
                      "No upcoming group sessions.",
                      "#e8f1ff"
                    )}
                    {renderSessionSection(
                      "Completed group sessions",
                      groupCompleted,
                      "No completed group sessions yet.",
                      "#e6f7ee"
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <CreateSessionModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedSession(null);
            setSelectedGroup(null);
            setSessionType("personal");
          }}
          onSave={handleSaveSession}
          initialData={selectedSession}
          type={sessionType}
          group={selectedGroup ?? undefined}
        />
      </div>
    </div>
  );
};

export default StudySession;
