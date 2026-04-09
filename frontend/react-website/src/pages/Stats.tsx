import React, {useEffect, useState} from "react";
import ProgressBar from "../components/ProgressBar";
import StreakCard from "../components/StreakCard";
import {getExp} from "../services/StudentService.tsx";

const Stats = () => {
  const [progress, setProgress] = useState(0);
  const maxExp = 10;
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const exp = await getExp(1);// add your student id here
          setLevel(Math.floor(exp / maxExp));
          setProgress(exp % maxExp);
      } catch (error) {
        console.error("Error fetching EXP:", error);
      }
    };
    fetchExp().then(() => console.log("Fetched EXP successfully"));
  }, []);

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
