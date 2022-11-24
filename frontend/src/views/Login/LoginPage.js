import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./style.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokenState, setTokenState] = useState("");
  const cookies = new Cookies();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email: ", email);
    console.log("password: ", password);

    const data = {
      email: email,
      password: password,
    };

    // console.log(data);
    console.log(JSON.stringify(data));

    fetch("http://localhost:3001/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((token) => {
        console.log(token);
        setTokenState(token);
      });
  };

  useEffect(() => {
    if (cookies.get("token") !== undefined) console.log(cookies.get("token"));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tokenState.token !== undefined) {
      cookies.set("token", tokenState.token, { path: "/" });
      console.log("cookies: ", cookies.get("token"));
      window.location.href='/'
    }
    if (tokenState.status === 'User not found'){
      alert("El usuario no existe")
    }
    //eslint-disable-next-line
  }, [tokenState]);

  return (
    <div className="login-container">
      <div className="form-container">
        <h1><i> Electronica Godio</i></h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="email-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <input
            className="password-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <input className="boton-submit" type="submit" value="INGRESAR" />
        </form>
      </div>
    </div>
  );
}
