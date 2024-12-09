import { IoIosCloseCircleOutline } from "react-icons/io";
import './ViewModal.css';
const ViewModal = ({
  isViewModalOpen,
  isViewModalVisible,
  closeViewModal,
  viewTodo = {}, // Default empty object to avoid errors
}) => {
  if (!isViewModalOpen) return null; // Only render if `isOpen` is true
  return (
    <div
      className={`modal-overlay ${isViewModalVisible ? "fade-in" : "fade-out"}`}
    >

      <div className="view-modal-content">
  <div className="header">
    <h2>Task Details</h2>
    <IoIosCloseCircleOutline className="close-icon" onClick={closeViewModal} />
  </div>
  <div className="internal-view-content">
    <p>
      <strong>Title:</strong> {viewTodo.title}
    </p>
    <p>
      <strong>Description:</strong> {viewTodo.description}
    </p>
    <p>
      <strong>Category:</strong> {viewTodo.category.name}
    </p>
    <div className="tags-section">
      <span><strong>Tags:</strong></span>
      <div className="tags-container">
        {viewTodo.tag.map((item, index) => (
          <span key={index} className="tag">{item.name}</span>
        ))}
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ViewModal;
