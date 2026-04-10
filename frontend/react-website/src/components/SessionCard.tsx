import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { StudySessionItem } from "../types/studySession";
import SessionProgressBar from "./SessionProgressBar";

interface Props {
  session: StudySessionItem;
  onRemove: (id: string) => void;
  onEdit: (session: StudySessionItem) => void;
  onComplete: (id: string) => void;
}

const SessionCard = ({ session, onRemove, onEdit, onComplete }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isCompleted = session.completed;

  const now = new Date();
  const start = new Date(session.startTime);
  const originalEnd = new Date(session.endTime);

  const effectiveEnd =
    isCompleted && session.completedAt
      ? new Date(session.completedAt)
      : originalEnd;

  const totalMs = originalEnd.getTime() - start.getTime();

  const elapsedMs = isCompleted
    ? Math.max(0, Math.min(effectiveEnd.getTime() - start.getTime(), totalMs))
    : Math.max(0, Math.min(now.getTime() - start.getTime(), totalMs));

  let progress = 0;
  let color = "#2563eb";

  if (isCompleted) {
    color = "#16a34a";
    progress = totalMs > 0 ? (elapsedMs / totalMs) * 100 : 100;
  } else if (now < start) {
    progress = 0;
    color = "#3b82f6";
  } else if (now >= start && now <= originalEnd) {
    color = "#f59e0b";
    progress = totalMs > 0 ? (elapsedMs / totalMs) * 100 : 0;
  } else {
    progress = 100;
    color = "#f59e0b";
  }

  const xpGained = Math.round(progress);

  return (
    <div
      style={{
        width: "220px",
        padding: "16px",
        backgroundColor: "#f7f7f7",
        borderRadius: "12px",
        border: "1px solid #e2e2e2",
        position: "relative",
        textAlign: "left",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <MoreHorizontal size={18} color="#666" />
        </button>

        {isMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: 0,
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
              overflow: "hidden",
              zIndex: 10,
              minWidth: "120px",
            }}
          >
            {!session.completed && (
              <button
                onClick={() => {
                  onComplete(session.id);
                  setIsMenuOpen(false);
                }}
                style={menuItemStyle}
              >
                Mark as completed
              </button>
            )}
            {!session.completed && (
              <button
                onClick={() => {
                  onEdit(session);
                  setIsMenuOpen(false);
                }}
                style={menuItemStyle}
              >
                Edit
              </button>
            )}

            <button
              onClick={() => {
                onRemove(session.id);
                setIsMenuOpen(false);
              }}
              style={{
                ...menuItemStyle,
                color: "#dc2626",
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {session.type === "group" && session.groupName && (
        <h4
          style={{
            margin: "0 0 6px 0",
            fontSize: "18px",
            color: "#000",
            fontWeight: 600,
          }}
        >
          {session.groupName}
        </h4>
      )}

      <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
        {session.subject}
      </h3>

      <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#444" }}>
        {formatDate(session.startTime)}
      </p>

      <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#444" }}>
        {formatTime(session.startTime)} -{" "}
        {formatTime(
          session.completed && session.completedAt
            ? session.completedAt
            : session.endTime
        )}
      </p>

      {session.type === "group" && session.location && (
        <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "13px" }}>
          📍 {session.location}
        </p>
      )}

      <SessionProgressBar progress={progress} color={color} />

      {isCompleted && <p style={xpText}>+{xpGained} XP</p>}
    </div>
  );
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const menuItemStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "none",
  background: "white",
  textAlign: "left" as const,
  cursor: "pointer",
  fontSize: "14px",
};

const xpText = {
  margin: "8px 0 0 0",
  fontSize: "13px",
  fontWeight: 600,
  color: "#166534",
};

export default SessionCard;
