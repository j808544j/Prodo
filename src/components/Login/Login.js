import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login({ cachedUsers, cachedLoggedUser }) {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  function handleLogin(event) {
    if (cachedUsers !== null) {
      const user = cachedUsers.find(
        (user) => user.username === userName && user.password === password
      );
      if (user === undefined) {
        alert("wrong username or password. Check localstorage for key users.");
      } else {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.reload();
      }
    }
  }

  function handleInput(event) {
    if (event.target.name === "username") {
      setUserName(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  }

  function handleLogout(event) {
    localStorage.setItem("loggedUser", null);
    window.location.reload();
  }

  if (cachedLoggedUser !== null) {
    return (
      <>
        <Link to="/">
          <h1>Prodo</h1>
        </Link>
        <h1>You are already logged In {cachedLoggedUser.name.firstname}</h1>
        <button className={styles.button} name="logout" onClick={handleLogout}>
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <h1 className={styles.logoh1}>
        <Link to="/" className={styles.navh1}>
          Prodo
        </Link>
      </h1>
      <section className={styles.loginSection}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h2>Login</h2>
          <label> Username </label>
          <input
            className={styles.loginFormInput}
            name="username"
            onChange={handleInput}
          />
          <label>Password</label>
          <input
            className={styles.loginFormInput}
            name="password"
            onChange={handleInput}
          />
          <label />
          <button className={styles.formButton}> Submit </button>
        </form>
        <button className={styles.Button}>Create a new account</button>
      </section>
    </>
  );
}

export default Login;
