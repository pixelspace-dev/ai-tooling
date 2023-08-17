import React from "react";
import { useNavigate } from "react-router-dom";
import "./saved-articles-banner.css"

const BackArrow = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  return (
    <button onClick={routeChange} className="back-arrow-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
      >
        <path
          d="M11.67 18.0301L9.89 19.8L8.65485e-07 9.90005L9.9 5.23639e-05L11.67 1.77005L3.54 9.90005L11.67 18.0301Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default function Banner({
  companyName,
  sidebar,
  setSidebar,
}) {
  return (
    <>
      <div className="saved-articles-banner">
        <BackArrow />

        <h1 className="company-name-in-saved-articles">{companyName}</h1>
        <p className="saved-articles-heading">SAVED ARTICLES</p>
      </div>
    </>
  );
}
