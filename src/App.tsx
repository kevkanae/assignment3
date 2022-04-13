import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { IResponse } from "./interfaces/IResponse";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  const [data, setNewPageData] = useState<any>({});
  const [page, setNewPage] = useState<number>(1);

  const fetchData = async (page: number) => {
    await axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
      )
      .then((res) => {
        if (data[page] === undefined) {
          setNewPageData({ ...data, [page]: res.data.hits });
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData(page);
    // const timer = setInterval(fetchData, 10000);
    // return () => clearInterval(timer);
  }, [page]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home page={page} setNewPage={setNewPage} data={data} />}
        />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
