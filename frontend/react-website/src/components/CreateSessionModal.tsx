import React, { useState } from "react";
import type { StudySessionItem } from "../types/studySession";

const subjects = ["DAT251", "DAT333", "INF222"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: StudySessionItem) => void;

  type: "personal" | "group";
  group?: {
    id: string;
    name: string;
    subject: string;
  };
}

const CreateSessionModal = ({
  isOpen,
  onClose,
  onSave,
  type,
  group,
}: Props) => {
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!startTime || !endTime || !location) return;
    if (endTime <= startTime) return;
    if (type === "personal" && !subject) return;

    onSave({
      id: crypto.randomUUID(),
      subject: type === "group" ? group!.subject : subject,
      startTime,
      endTime,
      location,
      type,
      groupId: group?.id,
      groupName: group?.name,
    });

    setSubject("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    onClose();
  };

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Create Study Session</h2>
          <button onClick={onClose} style={closeButtonStyle}>
            ×
          </button>
        </div>

        <div style={formStyle}>
          {type === "personal" && (
            <div style={fieldStyle}>
              <label style={labelStyle}>Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select subject</option>
                {subjects.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={timeRowStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={inputStyle}
                step={900}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={inputStyle}
                step={900}
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Location</label>
            <input
              type="text"
              placeholder="e.g. HVL: M410"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button onClick={handleSave} style={saveButtonStyle}>
            Save Session
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.80)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const modalStyle = {
  width: "420px",
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  boxSizing: "border-box" as const,
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const titleStyle = {
  margin: 0,
  fontSize: "24px",
  lineHeight: 1.2,
};

const closeButtonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "24px",
  lineHeight: 1,
  cursor: "pointer",
  padding: 0,
  color: "#555",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px",
  width: "100%",
};

const timeRowStyle = {
  display: "flex",
  gap: "12px",
  width: "100%",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#222",
  textAlign: "left" as const,
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const saveButtonStyle = {
  marginTop: "4px",
  padding: "12px",
  backgroundColor: "#1f2d3d",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

export default CreateSessionModal;
