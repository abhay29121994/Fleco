import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { BiUndo } from "react-icons/bi";
import { IoIosEye } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";
import ViewModal from "../Modals/ViewModal";
import { toast } from "react-toastify";

export const CompletedTask = () => {
  const { user, token } = useAuth();
  const [completedTask, setCompletedTask] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [viewTodo, setViewTodo] = useState({});

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
  const getCompletedTask = async () => {
    const response = await fetch(
      "http://localhost:5000/api/todos/completedtask",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const finalResponse = await response.json();
    setCompletedTask(Array.isArray(finalResponse) ? finalResponse : []);

  };
  
  useEffect(() => {
    if (token) {
      getCompletedTask();
    }
  }, [token]);


  const statusChange = async (item) => {
    console.log(item._id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/changestatus/update/${item._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.ok) {
        toast.success("Todo status is changed");
        getCompletedTask();
      } else {
        toast.error("Failed in status change");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/delete/${id}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Todo is deleted successfully");
        getCompletedTask();
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Failed to delete todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Completed Task</h1>
     
 <div className="pendingTaskContainer">
          {completedTask &&
            completedTask.map((item, index) => (
              <div key={index} className="pendingTask">
                <div className="completed-task">
                <p className="completed-task-heading">Task {index + 1}</p>
                <span id="edit-opearions">
                    <IoIosEye
                      className="view"
                      onClick={() => openViewModal(item)}
                    />
                    <BiUndo  className="undo" onClick={()=>statusChange(item)}/>

                    <MdDeleteSweep
                      className="delete"
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
                      style={{ color: "rgb(16, 146, 33)" }}
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
              
              </div>
            ))}
        </div>
        <ViewModal
          isViewModalOpen={isViewModalOpen}
          isViewModalVisible={isViewModalVisible}
          closeViewModal={closeViewModal}
          viewTodo={viewTodo}
        />

    </>
  );
};
