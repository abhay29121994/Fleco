import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.webp" width="100" />
        </div>
        <ul className="menu">
        {isLoggedIn && (
          <li>
            <NavLink to="/">Home</NavLink>
          </li>)}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <button>
                <NavLink to="/logout">Logout</NavLink>
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              {/* <li>
                <NavLink to="/register">Register</NavLink>
              </li> */}
            </>
          )}
        </ul>
      </nav>
      </div>
    </>
  );
};
