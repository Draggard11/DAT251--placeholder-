import React, { useRef } from "react";
import { ArrowRight, BarChart3, Users, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudyHeroImage from "../assets/StudyHeroImage.webp";

const Home = () => {
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
      }}
    >
      <section
        style={{
          position: "relative",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          backgroundImage: `url(${StudyHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.62))",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "720px",
            padding: "0 24px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              lineHeight: 1.05,
              margin: "0 0 18px 0",
              fontWeight: 800,
              letterSpacing: "0.02em",
            }}
          >
            Study smarter, stay consistent
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              margin: "0 auto 30px auto",
              maxWidth: "620px",
              color: "#e5e7eb",
            }}
          >
            Track your progress, join study groups, and plan focused study
            sessions that help you reach your goals.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/Login")}
              style={{
                padding: "13px 24px",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Get Started <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={scrollToFeatures}
              style={{
                padding: "13px 24px",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.55)",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      <section
        ref={featuresRef}
        style={{
          padding: "48px 32px",
          backgroundColor: "var(--color-background)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px 0",
              fontSize: "30px",
              color: "var(--color-text)",
            }}
          >
            Everything you need to reach your goals
          </h2>

          <p
            style={{
              margin: "0 0 32px 0",
              color: "var(--color-text-muted)",
              fontSize: "16px",
            }}
          >
            Simple tools to stay organized, motivated, and consistent.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            <FeatureCard
              title="Track Progress"
              text="Monitor your level, streaks, and completed activities."
              accent="var(--color-primary-soft)"
              icon={<BarChart3 size={26} color="var(--color-primary)" />}
              onClick={() => navigate("/Stats")}
            />

            <FeatureCard
              title="Join Study Groups"
              text="Collaborate with others and stay accountable together."
              accent="var(--color-completed-soft)"
              icon={<Users size={26} color="var(--color-completed)" />}
              onClick={() => navigate("/Groups")}
            />

            <FeatureCard
              title="Plan Study Sessions"
              text="Create focused sessions and build better routines."
              accent="var(--color-active-soft)"
              icon={<CalendarDays size={26} color="var(--color-active)" />}
              onClick={() => navigate("/StudySession")}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  title,
  text,
  accent,
  icon,
  onClick,
}: {
  title: string;
  text: string;
  accent: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "18px",
        boxShadow: "var(--shadow-soft)",
        padding: "24px",
        textAlign: "left",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-soft)";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          backgroundColor: accent,
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: "0 0 8px 0",
          color: "var(--color-text)",
          fontSize: "18px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "var(--color-text-muted)",
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Home;
