import React from "react";
import ProgressBar from "../components/ProgressBar";

const Stats = () => {
    const progress = 67;
    const level = 3;
    return (
        <div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
            }}
        >

            <h1>These are your stats:</h1>
            <ProgressBar progress = {progress} level= {level}/>
            </div>
        </div>
    );
};

export default Stats;