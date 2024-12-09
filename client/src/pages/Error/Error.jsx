import { NavLink } from "react-router-dom";
import './Error.css'; // Import the CSS file

export const Error = () => {
  return (
    <div className="error-container">
      <h1>404 Not Found</h1>
      <p>
        <NavLink to="/">Return to Home</NavLink>
      </p>
      <p>
        <NavLink to="/contact">Report a Problem</NavLink>
      </p>
    </div>
  );
};
