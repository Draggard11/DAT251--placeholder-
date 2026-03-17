import React from "react";

const ProgressBar = ({progress, level}) => {

    return (
        <div style={{
                width: "200px",
                height: "200px",
                background: `conic-gradient(green ${progress}%, #ddd ${progress}%)`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <div style={{
                  width: "85%",
                  height: "85%",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontWeight: "bold"
                }}
            >
            <span>Lvl: {level} </span>
            <span style={{ fontWeight: 400, fontSize: 12 }}>{progress}%</span>
              </div>
        </div>
    );
};

export default ProgressBar;