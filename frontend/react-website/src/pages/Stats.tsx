import React from "react";

const Stats = () => {
    const progress = 40;
    return (
        <div>
            <h1>These are your stats:</h1>
            <div style={{
                    width: "300px",
                    height: "20px",
                    backgroundColor: "#ddd",
                    borderRadius: "10px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: progress + "%",
                      height: "100%",
                      backgroundColor: "green",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold"
                    }} >
                  {progress}%
                  </div>
            </div>
        </div>
    );
};

export default Stats;