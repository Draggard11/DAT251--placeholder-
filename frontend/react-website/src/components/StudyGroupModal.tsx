import React, { useState } from "react";
import { useEffect } from "react";
import type { StudyGroupData, StudyGroupItem } from "../types/studyGroupData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: StudyGroupData) => void;
  initialData?: StudyGroupItem | null;
}

const StudyGroupModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
  const [subject, setSubject] = useState("");
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject);
      setGroupName(initialData.groupName);
      setDescription(initialData.description);
      setLink(initialData.link);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!subject || !groupName) return;

    onSave({
      subject,
      groupName,
      description,
      link,
    });

    setSubject("");
    setGroupName("");
    setDescription("");
    setLink("");

    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "16px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h2 style={{ margin: 0 }}>Create Study Group</h2>

        {/* Group Name */}
        <input
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={inputStyle}
        />

        {/* Subject */}
        <input
          placeholder="Subject / Course"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={inputStyle}
        />

        {/* Description */}
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, minHeight: "80px" }}
        />

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            placeholder="Invite link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            Copy
          </button>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            {initialData ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  width: "100%",
};

export default StudyGroupModal;
