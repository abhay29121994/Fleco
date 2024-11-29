import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <h1>404 Not Found</h1>
      <p>
        <NavLink to="/">Return to Home </NavLink>
      </p>
      <p>
        <NavLink to="/contact">Report a Problem</NavLink>
      </p>
    </>
  );
};
