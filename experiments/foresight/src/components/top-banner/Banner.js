import "./banner.css";
import SavedArticlesButton from "./SavedArticlesButton";
import React from "react";
import TolaLogo from "../TolaLogo";

// const SidebarArrow = ({ toggle }) => {
//   return (
//     <button onClick={toggle} className="sidebar-arrow-button">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="29"
//         height="29"
//         viewBox="0 0 29 29"
//         fill="none"
//       >
//         <g clipPath="url(#clip0_278_4254)">
//           <path
//             d="M9.5 22.7031H0.015625M20.0156 14.7031H0.015625M20.0156 6.70312H0.015625"
//             stroke="white"
//             strokeWidth="2.71875"
//             strokeLinecap="square"
//             strokeLinejoin="round"
//           />
//         </g>
//         <defs>
//           <clipPath id="clip0_278_4254">
//             <rect
//               width="29"
//               height="29"
//               fill="white"
//               transform="matrix(-1 0 0 1 29 0)"
//             />
//           </clipPath>
//         </defs>
//       </svg>
//     </button>
//   );
// };

export default function Banner({
  companyName,
  setCompanyName,
  sidebar,
  setSidebar,
}) {
  // const [isEditing, setIsEditing] = useState(false);

  // // Save input value
  // const handleSave = ({ target }) => {
  //   setCompanyName(target.value);
  // };
  return (
    <>
      <div className="banner">
        {/* <SidebarArrow toggle={() => setSidebar(!sidebar)} /> */}
        <div style={{display: "flex"}}>
          <p className="heading-in-banner">Foresight</p>
          <TolaLogo />
        </div>
        <SavedArticlesButton className="button-for-saved-articles" />
      </div>
    </>
  );
}
