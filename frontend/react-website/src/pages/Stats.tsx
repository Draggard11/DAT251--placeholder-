import React from "react";
import ProgressBar from "../components/ProgressBar";
import StreakCard from "../components/StreakCard";

const Stats = () => {
  const progress = 67;
  const level = 3;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <h1>These are your stats:</h1>
        <ProgressBar progress={progress} level={level} />
        <StreakCard streak={4} completedDays={[0, 1]} />
      </div>
    </div>
  );
};

export default Stats;
