import React from "react";
import "./FireFlame.css";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const StreakCard = ({ streak = 4, completedDays = [0, 1] }) => {
  const today = new Date();
  const jsDay = today.getDay(); // Sun = 0, Mon = 1, ..., Sat = 6
  const currentDayIndex = jsDay === 0 ? 6 : jsDay - 1; // Mon = 0 ... Sun = 6

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "18px",
        padding: "22px",
        maxWidth: "420px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e5e5e5",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <span className="fire-icon">🔥</span>
        <h3
          style={{
            margin: 0,
            fontSize: "48px",
            color: "#1f2d3d",
            fontWeight: 700,
          }}
        >
          {streak} {streak === 1 ? "Week" : "Weeks"} Streak
        </h3>
      </div>

      <p
        style={{
          margin: "0 0 20px 0",
          color: "#5b6470",
          fontSize: "16px",
          lineHeight: 1.5,
        }}
      >
        Complete one activity before Sunday to keep it going
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {dayLabels.map((day, index) => {
          const isToday = index === currentDayIndex;
          const isCompleted = completedDays.includes(index);

          return (
            <div
              key={day}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: isToday ? 700 : 500,
                  color: isToday ? "#1f2d3d" : "#7a828c",
                }}
              >
                {day}
              </span>

              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isToday ? "#e9eefc" : "#ffffff",
                  border: isToday ? "2px solid #8aa4ff" : "1px solid #d9dde3",
                  color: isCompleted ? "#22a06b" : "#9aa3ad",
                  fontSize: "18px",
                  fontWeight: 700,
                  boxSizing: "border-box",
                }}
              >
                {isCompleted ? "✔" : "-"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCard;
