import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { StudyGroupItem } from "../types/studyGroupData";

interface Props {
  group: StudyGroupItem;
  onEdit: (group: StudyGroupItem) => void;
  onRemove: (groupId: string) => void;
}

const StudyGroupCard = ({ group, onEdit, onRemove }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "20px",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "28px", lineHeight: "1.2" }}>
          {group.groupName}
        </h3>

        <p style={{ margin: 0, color: "#666" }}>{group.subject}</p>

        {group.description && (
          <p style={{ margin: 0, color: "#666", fontSize: "16px" }}>
            {group.description}
          </p>
        )}

        <div style={{ display: "flex", gap: "6px" }}>
          <div style={avatar}></div>
          <div style={avatar}></div>
          <div style={avatar}></div>
          <span>+2</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: "18px",
              lineHeight: "1.2",
            }}
          >
            Attendance (last session)
          </p>

          <div style={{ display: "flex", gap: "6px" }}>
            <div style={avatar}></div>
            <div style={avatar}></div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
        }}
      >
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MoreHorizontal size={20} color="#666" />
        </button>

        {isMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "32px",
              right: 0,
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              minWidth: "140px",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => {
                onEdit(group);
                setIsMenuOpen(false);
              }}
              style={menuItemStyle}
            >
              Edit
            </button>

            <button
              onClick={() => {
                onRemove(group.id);
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

        <button style={{}}>Activate session</button>
      </div>
    </div>
  );
};

const avatar = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "#9a9a9a",
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

export default StudyGroupCard;
