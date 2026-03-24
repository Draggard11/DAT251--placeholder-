import React, { useState } from "react";
import CreateSessionModal from "../components/CreateSessionModal";

interface StudySessionItem {
  subject: string;
  duration: number;
}

const StudySession = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<StudySessionItem[]>([]);

  const handleSaveSession = (newSession: StudySessionItem) => {
    setSessions((prev) => [...prev, newSession]);
  };

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
            Start by creating a personal study session with a subject and
            duration.
          </p>
          <div
            onClick={() => setIsOpen(true)}
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
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {sessions.map((session, index) => (
                <div
                  key={index}
                  style={{
                    width: "220px",
                    padding: "16px",
                    backgroundColor: "#f7f7f7",
                    borderRadius: "12px",
                    border: "1px solid #e2e2e2",
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
                    {session.subject}
                  </h3>
                  <p style={{ margin: 0, color: "#555" }}>
                    {session.duration} min
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <CreateSessionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSaveSession}
        />
      </div>
    </div>
  );
};

export default StudySession;
