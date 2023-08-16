import "./App.css";
import ArticleGenerationPage from "./ArticleGenerationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/sidebar/Sidebar";
import SavedArticlesPage from "./components/saved-articles-page/SavedArticlesPage";
import ErrorPage from "./ErrorPage";

function App() {
  const [sidebar, setSidebar] = useState(false); // tells sidebar whether to be open or closed
  const [companyName, setCompanyName] = useState("Unnamed Company"); // updates company name (update in sidebar, also changes in title on page)
  const [items, setItems] = useState([
    { id: uuidv4(), text: "Unnamed Company", route:"/" },
  ]);
  const [companyNumber, setCompanyNumber] = useState(2)
  // const [pages, setPages] = useState([
  //   {
  //     path: `/`,
  //     element: (
  //       <ArticleGenerationPage
  //         companyName={companyName}
  //         setCompanyName={setCompanyName}
  //         setSidebar={setSidebar}
  //         sidebar={sidebar}
  //       />
  //     ),
  //     errorElement: <ErrorPage/>
  //   },
  //   {
  //     path: `saved-articles`,
  //     element: <SavedArticlesPage companyName={companyName} />,
  //     errorElement: <ErrorPage/>
  //   },
  // ]);

  // const router = createBrowserRouter(pages);
  // console.log(router)
  const router = createBrowserRouter([{
        path: `/`,
        element: (
          <ArticleGenerationPage
            items={items}
            setItems={setItems}
            companyName={companyName}
            setCompanyName={setCompanyName}
            setSidebar={setSidebar}
            sidebar={sidebar}
          />
        ),
        errorElement: <ErrorPage/>
      },
      {
        path: `saved-articles`,
        element: (
          <SavedArticlesPage companyName={companyName}
          />
        ),
        errorElement: <ErrorPage/>
      },{
        path: `company2`,
        element: (
          <ArticleGenerationPage
            items={items}
            setItems={setItems}
            companyName={companyName}
            setCompanyName={setCompanyName}
            setSidebar={setSidebar}
            sidebar={sidebar}
          />
        ),
        errorElement: <ErrorPage/>
      },
      {
        path: `company2/saved-articles`,
        element: (
          <SavedArticlesPage companyName={companyName}
          />
        ),
        errorElement: <ErrorPage/>
      }, ]);
  // let pages = JSON.parse(localStorage.getItem("pages"));
  // if (pages == null) {
  //   pages = [
  //     {
  //       path: `/`,
  //       element: (
  //         <ArticleGenerationPage
  //           items={items}
  //           setItems={setItems}
  //           companyName={companyName}
  //           setCompanyName={setCompanyName}
  //           setSidebar={setSidebar}
  //           sidebar={sidebar}
  //         />
  //       ),
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: `saved-articles`,
  //       element: <SavedArticlesPage companyName={companyName} />,
  //       errorElement: <ErrorPage />,
  //     },
  //   ];
  //   localStorage.setItem("pages", JSON.stringify(pages))
  // }
  // const router = createBrowserRouter(pages);
  console.log(router)
  return (
    <div className="App">
      <Sidebar
        isOpen={sidebar}
        close={() => setSidebar(false)}
        companyName={companyName}
        setCompanyName={setCompanyName}
        items={items}
        setItems={setItems}
        // pages={pages}
        // setPages={setPages}
        sidebar={sidebar}
        setSidebar={setSidebar}
        companyNumber={companyNumber}
        setCompanyNumber={setCompanyNumber}
      />
      {/* <ArticleGenerationPage /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
