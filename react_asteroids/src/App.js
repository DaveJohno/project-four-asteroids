import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./App.scss";
import TopTenScores from "./components/scores/TopTenScores";

function App() {
  function componentDidMount() {
    axios.get("").then((res) => console.log(res));
  }
  componentDidMount();

  return (
    <div className="App">
      <header className="App-header">
        <section className="">
          <h1>Welcome</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aliquam ab quae voluptatibus, omnis eveniet. Veritatis, quibusdam.
            Dignissimos, necessitatibus commodi. Consectetur voluptatum itaque
            inventore voluptate magnam labore nulla sequi pariatur.
          </p>
          <section className="top-scores">
            <TopTenScores />
          </section>
          <Link className="link-heading" to="/signin">
            Sign In
          </Link>
          <br />
          <Link className="link-heading" to="/signin">
            Sign up
          </Link>
          <br />
          <a href="/asteroids"> Asteroids</a>
        </section>
        <Routes>
          <Route path="./signin" />
          <Route path="/asteroids" />
        </Routes>
      </header>
    </div>
  );
}

export default App;
