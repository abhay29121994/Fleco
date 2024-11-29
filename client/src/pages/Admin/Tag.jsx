import { useEffect, useState, useRef } from "react";
import { LuClipboardEdit, LuDelete } from "react-icons/lu";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export const Tag = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState("");
  const { token } = useAuth();
  const inputRef = useRef(null); // Create a ref for the input field

  const inputHandler = (e) => {
    setName(e.target.value);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:5000/admin/route/tag", {
  //       method: "POST",
  //       body: JSON.stringify({ name }),
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const finalResponse = await response.json();
  //     if (response.ok) {
  //       getAllTags();
  //       toast.success(finalResponse.message);
  //     } else {
  //       toast.error(finalResponse.message);
  //     }
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllTags = async () => {
    try {
      const response = await fetch("https://fleco.onrender.com/admin/route/tags", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const finalResponse = await response.json();
      if (finalResponse) {
        setTags(finalResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getAllTags();
    } else {
      console.log("Token is not available yet.");
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://fleco.onrender.com/admin/route/tag/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const finalResponse = await response.json();
      if (response.ok) {
        toast.success(finalResponse.message);
        getAllTags();
      } else {
        toast.error(finalResponse.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (tag) => {
    setEditTagId(tag._id);
    setEditTagName(tag.name);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus the input immediately
      }
    }, 0);
  };
  const handleUpdate = async (id) => {
    if (!editTagName) return;
    try {
      const response = await fetch(
        `https://fleco.onrender.com/admin/route/tag/update/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name: editTagName }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const finalResponse = await response.json();

      if (finalResponse.acknowledged && finalResponse.modifiedCount > 0) {
        setEditTagId(null);
        getAllTags(); // Refresh the tags after successful update
        toast.success("Tag updated.");
      } else {
        toast.error("Tag not updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="subheading">Tag Section</h2>
      <div className="container">
        {/* <div className="form-div">
          <p>Add Tag </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter tag name"
              name="name"
              value={name}
              onChange={inputHandler}
            />

            <div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
        </div> */}
        <div className="list-div">
          <p>Tag List</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  {editTagId === item._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editTagName}
                          ref={inputRef}
                          onChange={(e) => setEditTagName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdate(item._id);
                            }
                          }}
                          style={{
                            border: "none",
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            borderBottom: "2px solid #319795",
                            outline: "none",
                            backgroundColor: "transparent !important", // Make background transparent

                            width: "200px",
                          }}
                        />
                      </td>
                      <td>
                        <div className="operations">
                          <div className="editbtn">
                            <Link to="">
                              <LuClipboardEdit
                                onClick={() => handleEdit(item)}
                              />
                            </Link>
                          </div>
                          <div className="deletebtn">
                            <LuDelete onClick={() => handleDelete(item._id)} />
                          </div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>
                        <div className="operations">
                          <div className="editbtn">
                            <Link to="">
                              <LuClipboardEdit
                                onClick={() => handleEdit(item)}
                              />
                            </Link>
                          </div>
                          <div className="deletebtn">
                            <LuDelete onClick={() => handleDelete(item._id)} />
                          </div>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
