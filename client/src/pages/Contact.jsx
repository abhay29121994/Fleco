import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setData({
        name: user.username,
        email: user.email,
        message: "",
      });
    } else {
      console.log("user not set");
    }
  }, [user]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData(() => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const finalResponse = await response.json();
        setData({ name: user.username, email: user.email  , message: "" });
        alert(finalResponse.message);
      } else {
        console.log("API error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="contact-form-container">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={data.name}
            name="username"
            placeholder="username"
            className="input"
            onChange={handleInput}
          />
        </div>
          
        <div>
          <input
            type="email"
            value={data.email}
            name="email"
            placeholder="email"
            className="input"
            onChange={handleInput}
          />
        </div>
        <div>
          <div>
            <textarea
              value={data.message}
              name="message"
              className="input"
              placeholder="Message"
              onChange={handleInput}
            ></textarea>
          </div>
          <button type="submit" className="add-btn">Submit</button>
        </div>
      </form>
      </div>
    </>
  );
};
