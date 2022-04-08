import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./App.scss";
import TopTenScores from "./components/scores/TopTenScores";
import SignUpModal from "./components/user/SignUPModal";
import SignInModal from "./components/user/SignInModal";
import TopTenModal from "./components/scores/TopTenModel";

function App() {
  const [SignUpOpen, setSignUpOpen] = React.useState(false);
  const handleSignUPOpen = () => setSignUpOpen(true);
  const handleSignUPClose = () => setSignUpOpen(false);

  const [SignInOpen, setSignInOpen] = React.useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <section className="site-container">
          <nav>
            <h1>Welcome To The Wonderful World Of Asteroids</h1>
            <ul className="Nav-list">
              <li>
                <div>
                  <TopTenModal />
                </div>
              </li>

              <li>
                <div>
                  <SignUpModal />
                  <SignInModal />
                </div>
              </li>
            </ul>
          </nav>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
            quas eveniet, culpa, voluptates necessitatibus, expedita ullam dolor
            nesciunt totam rem nobis eum pariatur quis dignissimos velit
            asperiores. Architecto, recusandae dolore.
          </p>

          <a href="./asteroids" className="Asteroids-button">
            {" "}
            Asteroids
          </a>
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
