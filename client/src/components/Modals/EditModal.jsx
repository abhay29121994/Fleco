import { IoIosCloseCircleOutline } from "react-icons/io";

const EditModal = ({
  isEditModalOpen,
  isEditModalVisible,
  closeEditModal,
  editTodo = {},
  handleUpdate,
  editInputHandler,
  category = [],
  newEditTags = [],
  handleEditTagKeyDown,
  oldEditTags = [],
  handleEditTagRemove,
  setNewEditTags
}) => {
  if (!isEditModalOpen) return null;
  return( <div
    className={`modal-overlay ${
      isEditModalVisible ? "fade-in" : "fade-out"
    }`}
  >
    <div className="edit-modal-content">
      <div className="header">
        <p>Edit Task</p>
        <IoIosCloseCircleOutline
          className="close"
          onClick={closeEditModal}
        />
      </div>
      <div className="edit-task-content">
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={editTodo.title}
              onChange={editInputHandler}
            />
          </div>
          <div>
            <label htmlFor="Description">Description</label>
            <textarea
              placeholder="Enter Description"
              name="description"
              value={editTodo.description}
              onChange={editInputHandler}
            ></textarea>
          </div>
          <div>
            <label htmlFor="Category">Select Category</label>
            <select
              name="category"
              value={editTodo.category._id} // Use the _id of the selected category
              onChange={editInputHandler}
            >
              {category &&
                category.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="Tag">Custom Tag</label>

            <input
              type="text"
              placeholder="Enter Custom Tag"
              name="tag"
              value={newEditTags || ""} // Use newEditTags for tag input
              onChange={(e) => setNewEditTags(e.target.value)} // Update newEditTags directly
              onKeyDown={handleEditTagKeyDown} // Handle "Enter" key to add a tag
            />
            <div className="tag-input">
              {oldEditTags.map((item, index) => (
                <div key={index} className="tag">
                  {item.name}
                  <IoIosCloseCircleOutline
                    className="remove-tag"
                    onClick={() => handleEditTagRemove(item)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="common-btn">
            <button type="submit" className="add">
              Update Todo
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>);
};

export default EditModal;
