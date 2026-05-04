import React, { useState } from "react";

interface Props {
  front: string;
  back: string;
}

const Flashcard = ({ front, back }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped((prev) => !prev)}
      style={{
        width: "320px",
        height: "200px",
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "18px",
            boxShadow: "var(--shadow-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center",
            fontWeight: 700,
            color: "var(--color-text)",
          }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "var(--color-primary-soft)",
            border: "1px solid var(--color-border)",
            borderRadius: "18px",
            boxShadow: "var(--shadow-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
