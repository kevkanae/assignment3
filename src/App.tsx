import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  const [postData, setNewPageData] = useState<any>({});

  const [page, setNewPage] = useState<number>(1);

  const fetchData = async (page: number) => {
    await axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
      )
      .then((res) => {
        if (postData[page] === undefined) {
          setNewPageData({ ...postData, [page]: res.data.hits });
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData(page);
    console.log("normal fetch");
  }, [page]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home page={page} setNewPage={setNewPage} data={postData} />}
        />
        <Route path="/post" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
