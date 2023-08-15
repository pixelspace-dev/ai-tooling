import "./App.css";
import ArticleGenerationPage from "./ArticleGenerationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/sidebar/Sidebar";
import SavedArticlesPage from "./components/saved-articles-page/SavedArticlesPage";
import ErrorPage from "./ErrorPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ArticleGenerationPage items={items} setItems={setItems} />,
//   },
// ]);

function App() {
  const [sidebar, setSidebar] = useState(false); // tells sidebar whether to be open or closed
  const [companyName, setCompanyName] = useState("Unnamed Company"); // updates company name (update in sidebar, also changes in title on page)
  const [items, setItems] = useState([
    { id: uuidv4(), text: "Unnamed Company" },
  ]);
  const [pages, setPages] = useState([
    {
      path: `/`,
      element: (
        <ArticleGenerationPage
          companyName={companyName}
          setSidebar={setSidebar}
          sidebar={sidebar}
        />
      ),
      errorElement: <ErrorPage/>
    },
    {
      path: `saved-articles`,
      element: <SavedArticlesPage companyName={companyName} />,
      errorElement: <ErrorPage/>
    },
  ]);

  const router = createBrowserRouter(pages);
  console.log(router)
  // const router = createBrowserRouter([{
  //       path: `/`,
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
  //       path: `saved-articles`,
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
