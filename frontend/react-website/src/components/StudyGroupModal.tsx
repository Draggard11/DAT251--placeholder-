import React, { useEffect, useState } from "react";
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
    } else {
      setSubject("");
      setGroupName("");
      setDescription("");
      setLink("");
    }
  }, [initialData, isOpen]);

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
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {initialData ? "Edit Study Group" : "Create Study Group"}
          </h2>
          <button onClick={onClose} style={closeButtonStyle}>
            ×
          </button>
        </div>

        <div style={formStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Group Name</label>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Subject / Course</label>
            <input
              type="text"
              placeholder="e.g. DAT251"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={textAreaStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Invite Link</label>
            <div style={linkRowStyle}>
              <input
                type="text"
                placeholder="Paste or generate invite link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button type="button" style={copyButtonStyle}>
                Copy
              </button>
            </div>
          </div>

          <button onClick={handleSave} style={saveButtonStyle}>
            {initialData ? "Save Changes" : "Create Group"}
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
  zIndex: 1000,
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

const textAreaStyle = {
  ...inputStyle,
  minHeight: "90px",
  resize: "vertical" as const,
  fontFamily: "inherit",
};

const linkRowStyle = {
  display: "flex",
  gap: "12px",
  width: "100%",
  alignItems: "stretch",
};

const copyButtonStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "white",
  cursor: "pointer",
  fontWeight: 500,
  whiteSpace: "nowrap" as const,
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

export default StudyGroupModal;
