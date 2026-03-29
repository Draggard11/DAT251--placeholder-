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
  // Oppdater duration i modal slik at vi istedenfor ser duration som: 60 min. Så ser vi 15:15 - 16:15 også i tillegg
  // må vi se lokasjon, f eks hvl: M410 eller UiB: romnr
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
      subject,
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
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "420px",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <h2>Create Study Session</h2>
          <button onClick={onClose}>x</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {type === "personal" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label>Subjects</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
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
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <label>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={inputStyle}
              step={900}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <label>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={inputStyle}
              step={900}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Location</label>
          <input
            type="text"
            placeholder="e.g. HVL: M410"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            marginTop: "8px",
            padding: "12px",
            backgroundColor: "#1f2d3d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Session
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  fontSize: "14px",
  outline: "none",
};

export default CreateSessionModal;
