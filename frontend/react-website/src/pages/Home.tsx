import React from "react";
import StudyHeroImage from "../assets/StudyHeroImage.webp";
import HvlLogo from "../assets/hvl_logo.png";

const Home = () => {
  return (
    <div>
      <section
        style={{
          position: "relative",
          padding: "200px 50px",
          textAlign: "center",
          color: "white",
          backgroundImage: `url(${StudyHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // juster denne
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <img
            src={HvlLogo}
            alt="logo"
            style={{ width: "100px", marginBottom: "20px" }}
          />

          <h1 style={{ fontSize: "42px", marginBottom: "16px" }}>
            Study smarter
          </h1>

          <p style={{ fontSize: "18px", marginBottom: "24px" }}>
            Track your progress, join study groups, and stay consistent every
            week
          </p>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "16px" }}
          >
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#1f2d3d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Get Started
            </button>

            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              View Stats
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
