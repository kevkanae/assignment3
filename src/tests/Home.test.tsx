import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

describe("does my initial route", () => {
  test("work correctly", () => {
    const data = {
      hits: [
        {
          1: {
            created_at: "2022-04-13T10:30:41.000Z",
            author: "kevincox",
            story_title: "Eden",
            story_url: "https://github.com/facebookexperimental/eden",
          },
        },
      ],
    };
    let view = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<Home data={data} page={1} setNewPage={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(view).toMatchSnapshot();
  });
});
