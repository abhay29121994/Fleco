import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { storeTokenLocally } = useAuth();
  // console.log(storeTokenLocally);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://fleco.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log("If block");
      alert(responseData.message); //login successful message alert
      storeTokenLocally(responseData.token);
      navigate("/");
    } else {
      console.log("Else block");
      alert(
        responseData.extraDetails
          ? responseData.extraDetails
          : responseData.message
      ); //invalid credentials
    }
    // console.log(user);
  };
  return (
    <>
      <div className="Login-container">
        {" "}
        <h1>Task Todo Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={user.email}
              name="email"
              placeholder="Email"
              className="input"
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="password"
              value={user.password}
              name="password"
              placeholder="Password"
              className="input"
              onChange={handleInput}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have account then <a href="/register">Sign up</a></p>
      </div>
    </>
  );
};
