// Home.jsx
import { useState } from "react";
import { PendingTask } from "../components/Tasks/PendingTask";
import { AddTask } from "../components/Tasks/AddTask";
import { CompletedTask } from "../components/Tasks/CompletedTask";

export const Home = () => {
  const [selectedOption, setSelectedOption] = useState("pending");

  // Function to render selected component
  const renderContent = () => {
    switch (selectedOption) {
      case "pending":
        return <PendingTask />;
      case "add":
        return <AddTask setSelectedOption={setSelectedOption} />;
      case "completed":
        return <CompletedTask />;
      default:
        return <PendingTask />;
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => setSelectedOption("pending")}>Pending Task</li>
          <li onClick={() => setSelectedOption("add")}>Add Task</li>
          <li onClick={() => setSelectedOption("completed")}>Completed Task</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};
