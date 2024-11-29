import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Register = () => {
  const { storeTokenLocally } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://fleco.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      //console.log(response);
      const finalResponse = await response.json();

      if (response.ok) {
        // console.log("If block");
        storeTokenLocally(finalResponse.token);
        alert(finalResponse.message); //Registeration successful message alert

        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/");
      } else {
        // console.log("else block");
        alert(
          finalResponse.extraDetails
            ? finalResponse.extraDetails
            : finalResponse.message
        ); //user conflict and fields not properly filled message alert
      }
    } catch (error) {
      console.log("catch Block", error);
    }
    // console.log(user);
  };
  return (
    <>
    <div className="register-container">
      <h1>Task Todo Registeration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={user.username}
            name="username"
            placeholder="username"
            className="input"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="email"
            className="input"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="phone"
            name="phone"
            value={user.phone}
            placeholder="phone"
            className="input"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="password"
            className="input"
            onChange={handleInput}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account then <a href="/login">Log in</a></p>

      </div>
    </>
  );
};
