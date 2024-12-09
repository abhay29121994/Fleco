import { useEffect, useState } from "react";
import { useAuth } from "../../../store/auth";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgMathPlus } from "react-icons/cg";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosEye } from "react-icons/io";
import ViewModal from "../../Modals/ViewModal/ViewModal";
import EditModal from "../../Modals/EditModal/EditModal";
import AddModal from "../../Modals/AddModal/AddModal";
import "./PendingTask.css";
export const PendingTask = () => {
  const { user, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]); // Store tags
  const [pendingTask, setPendingTask] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    category: "Work",
    tag: "",
  });
  const [viewTodo, setViewTodo] = useState({});
  const [editTodo, setEditTodo] = useState({
    title: "",
    description: "",
    category: "",
    tag: "",
  });
  const [oldEditTags, setOldEditTags] = useState([]);
  const [newEditTags, setNewEditTags] = useState();
  const getPendingTask = async (req, res) => {
    try {
      const response = await fetch(
        "https://fleco.onrender.com/api/todos/pendingtask",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const finalResponse = await response.json();

      // setPendingTask(finalResponse);
      setPendingTask(Array.isArray(finalResponse) ? finalResponse : []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getPendingTask();
    }
  }, [token]);

  const handleTagKeyDown = (e) => {
    const { value } = e.target;
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault(); // Prevent form submit

      setTags([...tags, value.trim()]);

      setTodo({ ...todo, tag: "" }); // Clear input after adding tag
    }
  };

  const handleEditTagKeyDown = (e) => {
    const { value } = e.target;
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault();
      setOldEditTags([...oldEditTags, { name: value.trim() }]); // Add the new tag to oldEditTags
      setNewEditTags(""); // Clear the tag input field
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(
        "https://fleco.onrender.com/api/todos/categories",
        {
          method: "GET",
        }
      );
      const finalResponse = await response.json();
      setCategory(finalResponse);
      // console.log(token);
    } catch (error) {
      console.log("Server error");
    }
  };

  useEffect(() => {
    if (token) {
      getCategories();
    }
  }, [token]);

  useEffect(() => {
    if (category && category.length > 0) {
      // Set the first category ID as the initial category
      setTodo((prevTodo) => ({
        ...prevTodo,
        category: category[0]._id, // Set the ID of the first category
      }));
    }
  }, [category]); // Add categories as a dependency

  const openModal = () => {
    setIsModalOpen(true);
    setIsModalVisible(true); // Show modal immediately
  };

  const closeModal = () => {
    setIsModalVisible(false); // Start exit animation
    setTimeout(() => {
      setIsModalOpen(false); // Remove modal after animation
    }, 300); // Duration should match CSS transition duration
  };

  const openViewModal = (item) => {
    setViewTodo(item);
    setIsViewModalOpen(true);
    setIsViewModalVisible(true);
  };
  const closeViewModal = () => {
    setIsViewModalVisible(false);
    setTimeout(() => {
      setIsViewModalOpen(false);
    }, 300);
  };

  const openEditModal = (item) => {
    setEditTodo(item);
    setOldEditTags(item.tag);
    // console.log(newEditTags);
    setIsEditModalOpen(true);
    setIsEditModalVisible(true);
  };
  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setTimeout(() => {
      setIsEditModalOpen(false);
    }, 300);
  };
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTagRemove = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove)); // Remove tag
  };
  const handleEditTagRemove = (tagToRemove) => {
    setOldEditTags((prev) => prev.filter((tag) => tag !== tagToRemove)); // Remove tag
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setTodo((prev) =>
    const response = await fetch(
      "https://fleco.onrender.com/api/tags/checkandstoretags/",
      {
        method: "POST",
        body: JSON.stringify({ tags }),

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const finalTagIds = await response.json();
    saveTodo(finalTagIds);
  };

  const saveTodo = async (finalTagIds) => {
    // let finalTodo = { ...todo, tag: finalTagIds };
    const tagIds = finalTagIds.tagIds || finalTagIds;
    const userId = user._id;

    let newTodo = { ...todo, tag: tagIds, createdBy: userId }; // Include userId here

    try {
      let response = await fetch(
        "https://fleco.onrender.com/api/todos/addtodo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo), // Send finalTodo directly
        }
      );
      response = await response.json();
      getPendingTask();
      closeModal();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("Updated Todo:", todo); // This will run whenever todo state changes
  }, [todo]); // Only re-run the effect if `todo` changes

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://fleco.onrender.com/api/todos/delete/${id}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Todo is deleted successfully");
        getPendingTask(); // Call the function to update the pending tasks
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Failed to delete todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const todoCompleted = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `https://fleco.onrender.com/api/todos/status/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.ok) {
        toast.success("Todo is completed");
        getPendingTask();
      } else {
        toast.error("Failed to complete todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editInputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const updatedTodo = {
        ...editTodo, // Include existing fields like title, description, category, etc.
        tag: oldEditTags, // Ensure tags are passed correctly
      };
      const response = await fetch(
        "https://fleco.onrender.com/api/todos/updatetask",
        {
          method: "PATCH",
          body: JSON.stringify(updatedTodo),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
      }

      const result = await response.json(); // Parse the JSON response
      console.log("Update successful:", result);
      getPendingTask();
      toast.success("Update Successful");
      closeEditModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1>Pending Task</h1>
        {/* <p>Hi {user.username} These are your pending tasks</p> */}
        <CgMathPlus onClick={openModal} className="addTodo" />
        <div className="pendingTaskContainer">
          {pendingTask &&
            pendingTask.map((item, index) => (
              <div key={index} className="pendingTask">
                <div className="task-heading">
                  <p>Task {index + 1}</p>
                  <span id="opearions">
                    <IoIosEye
                      className="view"
                      onClick={() => openViewModal(item)}
                    />
                    <AiTwotoneEdit
                      id="edit"
                      onClick={() => openEditModal(item)}
                    />
                    <MdDeleteSweep
                      id="delete"
                      onClick={() => deleteTodo(item._id)}
                    />
                  </span>
                </div>

                <div className="bar">
                  <p>
                    <span className="sub-Headings">Title : </span>
                    <span className="sub-content">{item.title}</span>
                  </p>
                  <p>
                    <span className="sub-Headings">Status : </span>
                    <span
                      className="sub-content"
                      style={{ color: "rgb(230, 26, 26)" }}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>
                <div className="bar">
                  <p>
                    <span className="sub-Headings">Description : </span>
                    <span className="sub-content">{item.description}</span>
                  </p>
                </div>
                <div className="bar">
                  <p>
                    <span className="sub-Headings">Category : </span>
                    <span className="sub-content"> {item.category.name}</span>
                  </p>
                </div>
                <div className="tags-bar">
                  <span className="sub-Headings tag-head">Tags: </span>
                  <div className="all-tags">
                    {item.tag &&
                      item.tag.map((tag, tagIndex) => (
                        <p className="tags" key={tagIndex}>
                          {tag.name}
                        </p>
                      ))}
                  </div>
                </div>
                <div className=" bar completed">
                  <button
                    className="completed-btn"
                    onClick={() => todoCompleted(item._id)}
                  >
                    Completed
                  </button>
                </div>
              </div>
            ))}
        </div>

        <ViewModal
          isViewModalOpen={isViewModalOpen}
          isViewModalVisible={isViewModalVisible}
          closeViewModal={closeViewModal}
          viewTodo={viewTodo}
        />
        <EditModal
          isEditModalOpen={isEditModalOpen}
          isEditModalVisible={isEditModalVisible}
          closeEditModal={closeEditModal}
          editTodo={editTodo}
          handleUpdate={handleUpdate}
          editInputHandler={editInputHandler}
          category={category}
          newEditTags={newEditTags}
          handleEditTagKeyDown={handleEditTagKeyDown}
          oldEditTags={oldEditTags}
          handleEditTagRemove={handleEditTagRemove}
          setNewEditTags={setNewEditTags}
        />

        <AddModal
          isModalOpen={isModalOpen}
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          todo={todo}
          inputHandler={inputHandler}
          category={category}
          handleTagKeyDown={handleTagKeyDown}
          handleTagRemove={handleTagRemove}
          tags={tags}
        />
      </div>
    </>
  );
};
