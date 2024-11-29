import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { useEffect, useState } from "react";
import "./AdminLayout.css";

export const AdminLayout = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false); // State for isAdmin
  const navigate = useNavigate(); // To programmatically navigate users

  useEffect(() => {
    if (user) {
      const adminStatus = user.isAdmin === true || user.isAdmin === "true"; // For both boolean and string "true"
      setIsAdmin(adminStatus);

      if (!adminStatus) {
        // Navigate non-admin users to the error page
        navigate("/error"); // Or wherever your error route is defined
      }
    }
  }, [user, navigate]);

  return (
    <>
      {isAdmin && ( // Conditionally render Admin Section only if isAdmin is true
        <>
          <h3 className="admin-section-header">Admin Section</h3>
          <ul className="list-container">
            <li>
              <NavLink to="/admin/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/admin/category">Category</NavLink>
            </li>
            <li>
              <NavLink to="/admin/tag">Tag</NavLink>
            </li>
            <li>
              <NavLink to="/admin/todos">All Todos</NavLink>
            </li>
          </ul>
          <Outlet />
        </>
      )}
    </>
  );
};
