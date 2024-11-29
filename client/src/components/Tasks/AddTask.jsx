import { useEffect, useState } from "react";
import AddModal from "../Modals/AddModal";
import { useAuth } from "../../store/auth";

export const AddTask = ({setSelectedOption }) => {
  const { user, token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]); // Store tags

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
  const closeModal = () => {
    setIsModalVisible(false); // Start exit animation
    setTimeout(() => {
      setIsModalOpen(false); // Remove modal after animation
    }, 300); // Duration should match CSS transition duration
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
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    category: "Work",
    tag: "",
  });

  const saveTodo = async (finalTagIds) => {
    // let finalTodo = { ...todo, tag: finalTagIds };
    const tagIds = finalTagIds.tagIds || finalTagIds;
    const userId = user._id;

    let newTodo = { ...todo, tag: tagIds, createdBy: userId }; // Include userId here

    try {
      let response = await fetch("https://fleco.onrender.com/api/todos/addtodo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo), // Send finalTodo directly
      });
      response = await response.json();
      // getPendingTask();
      closeModal();
      setSelectedOption("pending");

      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagKeyDown = (e) => {
    const { value } = e.target;
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault(); // Prevent form submit

      setTags([...tags, value.trim()]);

      setTodo({ ...todo, tag: "" }); // Clear input after adding tag
    }
  };
  const handleTagRemove = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove)); // Remove tag
  };
  const openModal = () => {
    setIsModalOpen(true);
    setIsModalVisible(true); // Show modal immediately
  };


  return (
    <>
    <div id="add-todo-container">
      <button id="add-todo" onClick={openModal}>Add Todo</button>
      
    </div>
    <p id="note">Big goals start with small steps. What's your next step?</p>
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
    </>
  );
};
