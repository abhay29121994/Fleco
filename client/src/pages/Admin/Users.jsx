import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { LuClipboardEdit, LuDelete } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Users = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/route/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const finalResponse = await response.json();
      console.log(finalResponse);
      setUsers(finalResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getAllUsers();
    } else {
      console.log("No token available yet.");
    }
  }, [token]);

  const handleDelete = (id) => {
    alert(id);
  };
  return (
    <>
      <h2 className="subheading">Users</h2>

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>#</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td style={{ fontSize: "12px", textAlign: "center" }}>
                {index + 1}
              </td>
              <td style={{ textAlign: "center", fontSize: "12px" }}>
                {item.isAdmin === true || item.isAdmin === "true" ? (
                  <span>{item.username} (Admin)</span> // Display username for admin
                ) : (
                  <span>{item.username}</span> // Display username for non-admin
                )}
              </td>
              <td>
                <div className="operations">
                  <div className="editbtn">
                    <Link to={`/admin/category/${item._id}/edit`}>
                      <LuClipboardEdit />
                    </Link>
                  </div>
                  <div className="deletebtn">
                    {item.isAdmin === true || item.isAdmin === "true" ? (
                      <LuDelete style={{ cursor: "not-allowed" }} />
                    ) : (
                      <LuDelete onClick={() => handleDelete(item._id)} />
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
