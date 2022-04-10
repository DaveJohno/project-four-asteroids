import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UsersTopTenScores() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/asteroids/userScores")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) return null;

  return (
    <div className="top-ten-scores-section">
      <h1>Your Top 10 Scores</h1>
      <ul className="top-ten-scores">
        <li></li>
        <li>Top Scores</li>
        <li>Points</li>
        {data.map((score, index) => (
          <React.Fragment key={index}>
            <li></li>
            <li>{index + 1}</li>
            <li>{score.score}</li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
