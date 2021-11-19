import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import logo from "../logos/piano.gif";
function Login() {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, email: email, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          email: response.data.email,
          id: response.data.id,
          admin: response.data.admin, //tous ce qui est dans réponse concernant admin
          status: true,
        });
        history.push("/");
      }
    });
  };

  return (
    <div className="flex background">
      <div className="loginContainer">
        <img className="fond" src={logo} alt="Logo" />

        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setemail(event.target.value);
            setUsername("Profil  🎹");
          }}
        />

        <input
          type="hidden"
          value="Mon Profil"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button className="boutlog" onClick={login}>
          {" "}
          Login{" "}
        </button>
      </div>
    </div>
  );
}

export default Login;
