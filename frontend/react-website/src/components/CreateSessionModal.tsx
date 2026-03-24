import React, { useState } from "react";

const subjects = ["DAT251", "DAT333", "INF222"];
const durations = [25, 45, 60, 90, 120];

interface StudySessionItem {
  subject: string;
  duration: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: StudySessionItem) => void;
}

const CreateSessionModal = ({ isOpen, onClose, onSave }: Props) => {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!subject || !duration) return;

    onSave({
      subject,
      duration: Number(duration),
    });

    setSubject("");
    setDuration("");
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

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select duration</option>
            {durations.map((item) => (
              <option key={item} value={item}>
                {item} min
              </option>
            ))}
          </select>
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

export default CreateSessionModal;
