import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TopTenScores() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/asteroids/scores")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) return null;

  return (
    <div className="top-ten-scores-section">
      <h1>Top 10 Scores</h1>
      <ul className="top-ten-scores">
        <li>Rank</li>
        <li>Name</li>
        <li>Points</li>
        {data.map((score, index) => (
          <React.Fragment key={index}>
            <li>{index + 1}</li>
            <li>{score.user_name}</li>
            <li>{score.score}</li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
