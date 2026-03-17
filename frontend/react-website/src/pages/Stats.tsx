import React from "react";
import StreakCard from "../components/StreaksCard";

const Stats = () => {
  return (
    <div>
      <h1>this are the stats</h1>

      <StreakCard streak={4} completedDays={[0, 1]} />
    </div>
  );
};

export default Stats;
