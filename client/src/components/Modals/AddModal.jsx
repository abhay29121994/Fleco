import { IoIosCloseCircleOutline } from "react-icons/io";

const AddModal = ({
  isModalOpen,
  isModalVisible,
  closeModal,
  handleSubmit,
  todo = {},
  inputHandler,
  category = [],
  handleTagKeyDown,
  handleTagRemove,
  tags = [],
}) => {
  if (!isModalOpen) return null;
  return (
    <div className={`modal-overlay ${isModalVisible ? "fade-in" : "fade-out"}`}>
      <div className="modal-content">
        <div className="header">
          <p>Add Todo</p>
          <IoIosCloseCircleOutline className="close" onClick={closeModal} />
        </div>
        <div className="internal-modal-content">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={todo.title}
                onChange={inputHandler}
              />
            </div>
            <div>
              <label htmlFor="Description">Description</label>
              <textarea
                placeholder="Enter Description"
                name="description"
                value={todo.description}
                onChange={inputHandler}
              ></textarea>
            </div>
            <div>
              <label htmlFor="Category">Select Category</label>
              <select
                name="category"
                value={todo.category}
                onChange={inputHandler}
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
                value={todo.tag}
                onChange={inputHandler}
                onKeyDown={handleTagKeyDown}
              />
              <div className="tag-input">
                {tags.map((tag) => (
                  <div key={tag} className="tag">
                    {tag}
                    <IoIosCloseCircleOutline
                      className="remove-tag"
                      onClick={() => handleTagRemove(tag)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="common-btn">
              <button type="submit" className="add">
                Add Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
