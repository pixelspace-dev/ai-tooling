import "./App.css";
import ArticleGenerationPage from "./ArticleGenerationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import Sidebar from "./components/sidebar/Sidebar";
import SavedArticlesPage from "./components/saved-articles-page/SavedArticlesPage";
import ErrorPage from "./ErrorPage";

function App() {
  const [sidebar, setSidebar] = useState(false); // tells sidebar whether to be open or closed
  const [companyName, setCompanyName] = useState("Unnamed Company"); // updates company name (update in sidebar, also changes in title on page)
  // this is for the sidebar that is not in use
  // const [items, setItems] = useState([
  //   { id: uuidv4(), text: "Unnamed Company", route:"/" },
  // ]);
  // const [companyNumber, setCompanyNumber] = useState(2)

  // routes for different pages in the app
  const router = createBrowserRouter([{
        path: `/`,
        element: (
          <ArticleGenerationPage
            companyName={companyName}
            setCompanyName={setCompanyName}
            setSidebar={setSidebar}
            sidebar={sidebar}
            companyIndex="company1"
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
      }, ]);
  
  // the only thing in use here is te RouterProvider
  return (
    <div className="App">
      {/* <Sidebar
        isOpen={sidebar}
        close={() => setSidebar(false)}
        companyName={companyName}
        setCompanyName={setCompanyName}
        items={items}
        setItems={setItems}
        sidebar={sidebar}
        setSidebar={setSidebar}
        companyNumber={companyNumber}
        setCompanyNumber={setCompanyNumber}
      /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
