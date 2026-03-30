import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { StudyGroupItem } from "../types/studyGroupData";

interface Props {
  group: StudyGroupItem;
  onEdit: (group: StudyGroupItem) => void;
  onRemove: (groupId: string) => void;
  onCreateSession: (group: StudyGroupItem) => void;
}

const StudyGroupCard = ({
  group,
  onEdit,
  onRemove,
  onCreateSession,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={cardStyle}>
      <div style={leftContentStyle}>
        <h3 style={titleStyle}>{group.groupName}</h3>

        <p style={subjectStyle}>{group.subject}</p>

        {group.description && (
          <p style={descriptionStyle}>{group.description}</p>
        )}

        <div style={avatarsRowStyle}>
          <div style={avatarStyle}></div>
          <div style={avatarStyle}></div>
          <div style={avatarStyle}></div>
          <span>+2</span>
        </div>

        <div style={attendanceSectionStyle}>
          <p style={attendanceLabelStyle}>Attendance (last session)</p>

          <div style={avatarsRowStyle}>
            <div style={avatarStyle}></div>
            <div style={avatarStyle}></div>
          </div>
        </div>
      </div>

      <div style={rightContentStyle}>
        <div style={menuWrapperStyle}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            style={menuButtonStyle}
          >
            <MoreHorizontal size={20} color="#666" />
          </button>

          {isMenuOpen && (
            <div style={menuDropdownStyle}>
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
        </div>

        <button
          onClick={() => onCreateSession(group)}
          style={activateButtonStyle}
        >
          Activate session
        </button>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "20px",
  width: "100%",
  boxSizing: "border-box" as const,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  gap: "24px",
  position: "relative" as const,
};

const leftContentStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "20px",
  flex: 1,
  alignItems: "flex-start",
};

const rightContentStyle = {
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  alignItems: "flex-end",
  minWidth: "160px",
};

const menuWrapperStyle = {
  position: "relative" as const,
  alignSelf: "flex-end" as const,
};

const menuButtonStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const menuDropdownStyle = {
  position: "absolute" as const,
  top: "28px",
  right: 0,
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  minWidth: "140px",
  zIndex: 10,
  overflow: "hidden",
};

const titleStyle = {
  margin: 0,
  fontSize: "28px",
  lineHeight: "1.2",
};

const subjectStyle = {
  margin: 0,
  color: "#666",
};

const descriptionStyle = {
  margin: 0,
  color: "#666",
  fontSize: "16px",
};

const avatarsRowStyle = {
  display: "flex",
  gap: "6px",
  alignItems: "center",
};

const attendanceSectionStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px",
};

const attendanceLabelStyle = {
  margin: 0,
  color: "#666",
  fontSize: "18px",
  lineHeight: "1.2",
};

const activateButtonStyle = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const avatarStyle = {
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
