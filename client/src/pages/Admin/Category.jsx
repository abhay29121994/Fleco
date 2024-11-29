import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { LuClipboardEdit, LuDelete } from "react-icons/lu";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Editor from "../../components/Editor/JoditEditor";

export const Category = () => {
  const { token } = useAuth();

  // for add the single category
  const [category, setCategory] = useState({
    name: "",
    description: "",
    color: "#ff0000",
  });
  const [categories, setCategories] = useState([]); //for list the category
  const handleEditorChange = (newContent) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      description: newContent,
    }));
  };
  const getAllCategories = async () => {
    try {
      const response = await fetch(
        "https://fleco.onrender.com/admin/route/categories",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const finalResponse = await response.json();
      setCategories(finalResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getAllCategories();
    } else {
      console.log("No token available.");
    }
  }, [token]);

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCategory(() => ({
      ...category,
      [name]: value,
    }));
  };

  //!Add Category Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fleco.onrender.com/admin/route/category",
        {
          method: "POST",
          body: JSON.stringify(category),
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json",
          },
        }
      );
      let finalResponse = await response.json();

      if (response.ok) {
        setCategory({
          name: "",
          description: "",
          color: "#ff0000",
        });
        toast.success(finalResponse.message);
      } else {
        console.warn("Warning: ", finalResponse.message);
        toast.error("Sorry ! " + finalResponse.message);
      }

      getAllCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://fleco.onrender.com/admin/route/category/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },

        }
      );
      if (response.ok) {
        toast.success("Category deleted!");
        getAllCategories();
      } else {
        console.log("Category not deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="subheading">Category Section</h2>
      <div className="container">
        <div className="form-div">
          <p>Add category </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter category name"
              name="name"
              value={category.name}
              onChange={inputHandler}
            />

            {/* <textarea
              placeholder="Enter category description"
              name="description"
              value={category.description}
              onChange={inputHandler}
              className="textArea"
            ></textarea> */}
            <Editor
              value={category.description}
              onChange={handleEditorChange}
            />
            <div className="color-container">
              <label htmlFor="favcolor">Select your favorite color:</label>
              <input
                type="color"
                id="favcolor"
                name="color"
                value={category.color}
                onChange={inputHandler}
                className="colors"
                // value="#ff0000"
              ></input>
            </div>
            <div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="list-div">
          <p>Category List</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      style={{
                        backgroundColor: item.color,
                        color: "#fff",
                        padding: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {item.name}
                    </span>
                  </td>
                  <td>
                    <div className="operations">
                      <div className="editbtn">
                        <Link to={`/admin/category/${item._id}/edit`}>
                          <LuClipboardEdit />
                        </Link>
                      </div>
                      <div className="deletebtn">
                        <LuDelete onClick={() => handleDelete(item._id)} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
