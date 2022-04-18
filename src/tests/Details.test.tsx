import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";

test("Snapshot of Quiz component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <Details
        data={{
          created_at: "2022-04-13T10:30:41.000Z",
          author: "kevincox",
          story_title: "Eden",
          story_url: "https://github.com/facebookexperimental/eden",
        }}
      />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In details", () => {
  it("does go back button exist", () => {
    render(
      <BrowserRouter>
        <Details
          data={{
            created_at: "2022-04-13T10:30:41.000Z",
            author: "kevincox",
            story_title: "Eden",
            story_url: "https://github.com/facebookexperimental/eden",
          }}
        />
      </BrowserRouter>
    );

    let btn = screen.getByText(/Go Back/i);
    expect(btn).toBeInTheDocument();
  });
});
