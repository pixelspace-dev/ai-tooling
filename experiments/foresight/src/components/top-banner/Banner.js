import "./banner.css";
import SavedArticlesButton from "./SavedArticlesButton";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";

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
        <g clip-path="url(#clip0_278_4254)">
          <path
            d="M9.5 22.7031H0.015625M20.0156 14.7031H0.015625M20.0156 6.70312H0.015625"
            stroke="white"
            stroke-width="2.71875"
            stroke-linecap="square"
            stroke-linejoin="round"
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

export default function Banner() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <div className="banner">
        <SidebarArrow toggle={() => setSidebar(!sidebar)} />
        <Sidebar isOpen={sidebar} close={() => setSidebar(false)} />
        <h1>Unnamed Company</h1>
        <SavedArticlesButton className="saved-articles-button" />
      </div>
    </>
  );
}
