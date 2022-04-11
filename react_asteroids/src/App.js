import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import SignUpModal from "./components/user/SignUPModal";
import SignInModal from "./components/user/SignInModal";
import TopTenModal from "./components/scores/TopTenModel";
import UsersTopTenModal from "./components/scores/UsersTopTenModal";

function App() {
  const [SignUpOpen, setSignUpOpen] = React.useState(false);
  const handleSignUPOpen = () => setSignUpOpen(true);
  const handleSignUPClose = () => setSignUpOpen(false);

  const [SignInOpen, setSignInOpen] = React.useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  const [userLoggedIn, setUserLoggedIn] = React.useState(false);

  function handleUserSignIn(data) {
    if (!!data.loggedIn) {
      setUserLoggedIn(true);
    }
  }

  const handleUserSignOut = () => {
    axios
      .delete("/users")
      .then((req, res) => {
        console.log(res);
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      })
      .then(() => window.location.reload(false));
  };

  useEffect(() => {
    axios
      .get("/sessions")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        handleUserSignIn(data);
      });
  }, []);

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

                  {userLoggedIn && <UsersTopTenModal />}
                </div>
              </li>

              <li>
                <div>
                  {!userLoggedIn && <SignUpModal />}
                  {!userLoggedIn && <SignInModal />}

                  {/* azios request for the user by id */}
                  {userLoggedIn && (
                    <div
                      className="Asteroids-button"
                      onClick={handleUserSignOut}
                    >
                      Sign Out
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </nav>
          {userLoggedIn && (
            <div className="Asteroids">
              <a href="./asteroids" className="Asteroids-button">
                Play Asteroids
              </a>
            </div>
          )}
          <br />
          <p>
            Asteroids is a space-themed multidirectional shooter arcade game
            designed by Lyle Rains and Ed Logg released in November 1979 by
            Atari, Inc. The player controls a single spaceship in an asteroid
            field which is periodically traversed by flying saucers. The object
            of the game is to shoot and destroy the asteroids and saucers, while
            not colliding with either, or being hit by the saucers'
            counter-fire. The game becomes harder as the number of asteroids
            increases.
          </p>
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
