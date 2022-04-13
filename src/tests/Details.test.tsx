import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Details from "../pages/Details";

describe("does my initial route", () => {
  test("work correctly", () => {
    let view = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/post" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });
});
