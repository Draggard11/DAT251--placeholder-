interface Props {
  progress: number;
  color: string;
}

const SessionProgressBar = ({ progress, color }: Props) => {
  return (
    <div style={{ marginTop: "12px" }}>
      <div
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: "999px",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <p style={{ margin: "6px 0 0 0", fontSize: "12px", color: "#666" }}>
        {Math.round(progress)}%
      </p>
    </div>
  );
};

export default SessionProgressBar;
