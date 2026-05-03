import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import StreakCard from "../components/StreakCard";
import { getExp } from "../services/StudentService.tsx";
import { useAuth } from "../contexts/AuthContext";

const Stats = () => {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const maxExp = 10;
  const { student } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!student) {
      navigate("/Login");
      return;
    }

    const fetchExp = async () => {
      try {
        setIsLoading(true);
        setError("");
        const exp = await getExp(student.id);
        setLevel(Math.floor(exp / maxExp));
        setProgress(exp % maxExp);
        console.log("Fetched EXP successfully:", exp);
      } catch (error) {
        console.error("Error fetching EXP:", error);
        setError("Failed to load stats. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExp();
  }, [student, navigate]);

  if (!student) {
    return <div>Please log in to view your stats.</div>;
  }

  if (isLoading) {
    return <div>Loading your stats...</div>;
  }

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
        <h1>{student.name}'s Stats</h1>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <ProgressBar progress={progress} level={level} />
        <StreakCard streak={4} completedDays={[0, 1]} />
      </div>
    </div>
  );
};

export default Stats;
