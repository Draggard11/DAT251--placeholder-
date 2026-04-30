import React from "react";
import ProgressBar from "../components/ProgressBar";
import StreakCard from "../components/StreakCard";

const Stats = () => {
  const progress = 67;
  const level = 3;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "40px 32px",
        }}
      >
        <h1 style={{ color: "var(--color-text)", margin: 0 }}>
          These are your stats:
        </h1>

        <ProgressBar progress={progress} level={level} />
        <StreakCard streak={4} completedDays={[0, 1]} />
      </div>
    </div>
  );
};

export default Stats;
