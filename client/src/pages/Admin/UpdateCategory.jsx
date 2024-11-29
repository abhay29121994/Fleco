import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Editor from "../../components/Editor/JoditEditor";
import { useAuth } from "../../store/auth";

export const UpdateCategory = () => {
  const { token } = useAuth();

  const editId = useParams().id;
  const [category, setCategory] = useState({
    name: "",
    description: "",
    color: "#ff0000",
  });
  const editor = useRef(null);


  const getSingleCategory = async () => {
    const response = await fetch(
      `https://fleco.onrender.com/admin/route/category/${editId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const finalResponse = await response.json();
    if (finalResponse) {
      setCategory({
        name: finalResponse.name,
        description: finalResponse.description,
        color: finalResponse.color,
      });
    }
  };
  useEffect(() => {
    getSingleCategory();
  }, []);
  const handleEditorChange = (newContent) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      description: newContent,
    }));
  };
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCategory(() => ({
      ...category,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://fleco.onrender.com/admin/route/category/update/${editId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(category),
        }
      );
      if (response.ok) {
        toast.success("Data is updated.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="subheading">Category Section</h2>
      <div className="update-container">
        <div className="update-form-div">
          <p>Update category </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter category name"
              name="name"
              value={category.name}
              onChange={inputHandler}
            />

            <Editor
              value={category.description}
              onChange={handleEditorChange}
            />
            <div className="color-container">
              <label htmlFor="favcolor">Update your favorite color:</label>
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
              <button type="submit" className="update-btn">
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="update-data-continer">
          <div
            className="update-category-header"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </div>
          <div
            className="update-category-body"
            dangerouslySetInnerHTML={{ __html: category.description }} // Render HTML content
          >
            {/* {category.description} */}
          </div>
        </div>
      </div>
    </>
  );
};
