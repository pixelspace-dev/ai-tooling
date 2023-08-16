import "./banner.css";
import SavedArticlesButton from "./SavedArticlesButton";
import React, { useState } from "react";

const SidebarArrow = ({ toggle }) => {
  return (
    <button onClick={toggle} className="sidebar-arrow-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
      >
        <g clipPath="url(#clip0_278_4254)">
          <path
            d="M9.5 22.7031H0.015625M20.0156 14.7031H0.015625M20.0156 6.70312H0.015625"
            stroke="white"
            strokeWidth="2.71875"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_278_4254">
            <rect
              width="29"
              height="29"
              fill="white"
              transform="matrix(-1 0 0 1 29 0)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

export default function Banner({
  companyName,
  setCompanyName,
  sidebar,
  setSidebar,
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Save input value
  const handleSave = ({ target }) => {
    setCompanyName(target.value);
  };
  return (
    <>
      <div className="banner">
        <SidebarArrow toggle={() => setSidebar(!sidebar)} />

        {isEditing ? (
          <input
            className="banner-company-name-change-input"
            defaultValue={companyName}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <p className="heading-in-banner">{companyName}</p>
        )}

        <button
          className="banner-edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
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
          ) : (
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
          )}
        </button>
        <SavedArticlesButton className="saved-articles-button" />
      </div>
    </>
  );
}
