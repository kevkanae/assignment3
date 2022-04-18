import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  const [navigateWithData, setNavigateData] = useState<any>();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home withData={setNavigateData} />} />
        <Route path="/post" element={<Details data={navigateWithData} />} />
      </Routes>
    </>
  );
}

export default App;
