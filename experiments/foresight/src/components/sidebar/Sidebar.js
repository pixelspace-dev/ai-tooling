import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./sidebar.css";

const Sidebar = ({ isOpen, close }) => {
  const [items, setItems] = useState([
    { id: uuidv4(), text: "Unnamed Company" },
  ]); // set initial list
  const [editableItem, setEditableItem] = useState({ id: null, text: "" });

  const addItem = () => {
    let newItem = { id: uuidv4(), text: `Unnamed Company` };
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (item) => {
    setEditableItem(item);
  };

  const handleEditChange = (event) => {
    setEditableItem({ ...editableItem, text: event.target.value });
  };

  const updateItem = () => {
    setItems(
      items.map((item) => (item.id === editableItem.id ? editableItem : item))
    );
    setEditableItem({ id: null, text: "" });
  };

  return (
    <div>
      <nav className={isOpen ? "sidebar-menu active" : "sidebar-menu"}>
        <div className="title-and-close-button">
          <p className="foresight-title">Foresight</p>
          <button className="sidebar-button" onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="#DBEEF2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className="company-names-navegation">
          {items.map((item) => (
            <li className="company-names-navegation" key={item.id}>
              {editableItem.id === item.id ? (
                <>
                  <input className="change-company-name-input"
                    type="text"
                    value={editableItem.text}
                    onChange={handleEditChange}
                  />
                  <button className="update-check-button" onClick={updateItem}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                    >
                      <path
                        d="M6.4585 16.7916L11.6252 21.9583L24.5418 9.04163"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  {item.text}
                  <button className="edit-button" onClick={() => editItem(item)}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M12.6935 4.36019L15.6398 7.30647M13.9435 3.11019C14.7571 2.2966 16.0762 2.2966 16.8898 3.11019C17.7034 3.92379 17.7034 5.24288 16.8898 6.05647L5.41667 17.5296H2.5V14.5537L13.9435 3.11019Z"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="trash-button"
                    onClick={() => deleteItem(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M15.8335 5.83333L15.1107 15.9521C15.0484 16.8243 14.3227 17.5 13.4483 17.5H6.55203C5.67763 17.5 4.9519 16.8243 4.8896 15.9521L4.16683 5.83333M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M12.5002 5.83333V3.33333C12.5002 2.8731 12.1271 2.5 11.6668 2.5H8.3335C7.87326 2.5 7.50016 2.8731 7.50016 3.33333V5.83333M3.3335 5.83333H16.6668"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <button className="add-item-button" onClick={addItem}>
          <svg
            className="add-item-plus-symbol"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
