import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { StudySessionItem } from "../types/studySession";

interface Props {
  session: StudySessionItem;
  onRemove: (id: string) => void;
  onEdit: (session: StudySessionItem) => void;
}

const SessionCard = ({ session, onRemove, onEdit }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      style={{
        width: "220px",
        padding: "16px",
        backgroundColor: "#f7f7f7",
        borderRadius: "12px",
        border: "1px solid #e2e2e2",
        position: "relative",
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
            <button
              onClick={() => {
                onEdit(session);
                setIsMenuOpen(false);
              }}
              style={menuItemStyle}
            >
              Edit
            </button>

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

      <h3 style={{ marginTop: 0 }}>{session.subject}</h3>
      <p style={{ margin: "8px 0 4px 0" }}>
        {session.startTime} - {session.endTime}
      </p>
      <p style={{ margin: 0, color: "#666" }}>{session.location}</p>
    </div>
  );
};

const menuItemStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "none",
  background: "white",
  textAlign: "left" as const,
  cursor: "pointer",
  fontSize: "14px",
};

export default SessionCard;
