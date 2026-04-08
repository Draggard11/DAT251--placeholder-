import React, { useEffect, useState } from "react";
import type { StudySessionItem } from "../types/studySession";

const subjects = ["DAT251", "DAT333", "INF222"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: StudySessionItem) => void;
  initialData?: StudySessionItem | null;

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
  initialData,
}: Props) => {
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState<"scheduled" | "now">("scheduled");
  const [durationMinutes, setDurationMinutes] = useState("60");

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject || "");
      setStartTime(toTimeInputValue(initialData.startTime));
      setEndTime(toTimeInputValue(initialData.endTime));
      setDate(initialData.date || toDateInputValue(initialData.startTime));
      setLocation(initialData.location || "");
      setMode("scheduled");
      setDurationMinutes("60");
    } else {
      setSubject("");
      setStartTime("");
      setEndTime("");
      setDate("");
      setLocation("");
      setMode("scheduled");
      setDurationMinutes("60");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (type === "personal" && !subject) {
      console.log("Missing subject");
      return;
    }

    if (type === "group" && !group) {
      console.log("Missing group object");
      return;
    }

    if (type === "group" && !location) {
      console.log("Missing location for group session");
      return;
    }

    if (mode === "now") {
      const now = new Date();
      const end = new Date(now.getTime() + Number(durationMinutes) * 60000);

      onSave({
        id: initialData?.id ?? crypto.randomUUID(),
        subject: type === "group" ? group!.subject : subject,
        startTime: toTimeString(now),
        endTime: toTimeString(end),
        date: toDateInputValue(now.toISOString()),
        location,
        type,
        groupId: group?.id,
        groupName: group?.name,
      });

      onClose();
      return;
    }

    if (!date) {
      console.log("Missing date");
      return;
    }

    if (!startTime) {
      console.log("Missing start time");
      return;
    }

    if (!endTime) {
      console.log("Missing end time");
      return;
    }

    if (endTime <= startTime) {
      console.log("End time must be after start time");
      return;
    }

    onSave({
      id: initialData?.id ?? crypto.randomUUID(),
      subject: type === "group" ? group!.subject : subject,
      startTime,
      endTime,
      date,
      location,
      type,
      groupId: group?.id,
      groupName: group?.name,
    });

    onClose();
  };

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {initialData ? "Edit Study Session " : "Create Study Session"}
          </h2>
          <button onClick={onClose} style={closeButtonStyle}>
            ×
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button
            type="button"
            onClick={() => setMode("scheduled")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border:
                mode === "scheduled" ? "2px solid #1f2d3d" : "1px solid #ccc",
              backgroundColor: mode === "scheduled" ? "#eef2f7" : "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Schedule
          </button>

          <button
            type="button"
            onClick={() => setMode("now")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: mode === "now" ? "2px solid #1f2d3d" : "1px solid #ccc",
              backgroundColor: mode === "now" ? "#eef2f7" : "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Start now
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

          {mode === "scheduled" ? (
            <>
              <div style={fieldStyle}>
                <label style={labelStyle}>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={inputStyle}
                />
              </div>

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
            </>
          ) : (
            <div style={fieldStyle}>
              <label style={labelStyle}>Duration</label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                style={inputStyle}
              >
                <option value="30">30 minutes</option>
                <option value="0.5">30 seconds</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>
          )}

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
            {initialData ? "Save Changes" : "Save Session"}
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

const toDateInputValue = (value: string) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toTimeInputValue = (value: string) => {
  const date = new Date(value);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
const toTimeString = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default CreateSessionModal;
