import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (flashcard: { front: string; back: string }) => void;
}

const CreateFlashcardModal = ({ isOpen, onClose, onSave }: Props) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!front.trim() || !back.trim()) return;

    onSave({
      front: front.trim(),
      back: back.trim(),
    });

    setFront("");
    setBack("");
  };

  const handleClose = () => {
    setFront("");
    setBack("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: "var(--color-surface)",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          border: "1px solid var(--color-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: "0 0 8px 0" }}>Create Flashcard</h2>
        <p
          style={{
            margin: "0 0 20px 0",
            color: "var(--color-text-muted)",
          }}
        >
          Add a question on the front and the answer on the back.
        </p>

        <label style={labelStyle}>Front</label>
        <textarea
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Example: What is Scrum?"
          style={textareaStyle}
        />

        <label style={labelStyle}>Back</label>
        <textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Example: An agile framework..."
          style={textareaStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid var(--color-border)",
              backgroundColor: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "var(--color-primary)",
              color: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Save Flashcard
          </button>
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 600,
  color: "var(--color-text)",
};

const textareaStyle = {
  width: "100%",
  minHeight: "90px",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid var(--color-border)",
  resize: "vertical" as const,
  marginBottom: "16px",
  fontFamily: "inherit",
};

export default CreateFlashcardModal;
