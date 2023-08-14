import "./App.css";
import ArticleGenerationPage from "./ArticleGenerationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/sidebar/Sidebar";
import SavedArticlesPage from "./components/saved-articles-page/SavedArticlesPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ArticleGenerationPage items={items} setItems={setItems} />,
//   },
// ]);

function App() {
  const [sidebar, setSidebar] = useState(false);
  const [companyName, setCompanyName] = useState("Unnamed Company");
  const [items, setItems] = useState([
    { id: uuidv4(), text: "Unnamed Company" },
  ]);
  const [pages, setPages] = useState([
    {
      path: "/",
      element: (
        <ArticleGenerationPage
          items={items}
          setItems={setItems}
          companyName={companyName}
          setSidebar={setSidebar}
          sidebar={sidebar}
        />
      ),
    },
    {
      path: "/saved-articles",
      element: <SavedArticlesPage companyName={companyName} />,
    },
  ]);

   const router = createBrowserRouter( pages);
  // const router = createBrowserRouter([{
  //       path: "/",
  //       element: (
  //         <ArticleGenerationPage
  //           items={items}
  //           setItems={setItems}
  //           companyName={companyName}
  //           setSidebar={setSidebar}
  //           sidebar={sidebar}
  //         />
  //       ),
  //     },
  //     {
  //       path: "/saved-articles",
  //       element: (
  //         <SavedArticlesPage companyName={companyName}
  //         />
  //       ),
  //     }, ]);
  return (
    <div className="App">
      <Sidebar
        isOpen={sidebar}
        close={() => setSidebar(false)}
        companyName={companyName}
        setCompanyName={setCompanyName}
        items={items}
        setItems={setItems}
        pages={pages}
        setPages={setPages}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      {/* <ArticleGenerationPage /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
