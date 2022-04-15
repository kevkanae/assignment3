import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import {screen, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Home from "../pages/Home"

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

test("Snapshot of Quiz component", () => {
  const comp = renderer.create(
      <BrowserRouter>
        <Home data={data} page={1} setNewPage={() => {}}/>
      </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Score,", () => {
  test("are the next and previous buttons present", () => {
    render(<BrowserRouter>
      <Home data={data} page={1} setNewPage={() => {}}/>
    </BrowserRouter>);

    let a = screen.getByRole("loadingb")
    // let b = screen.getByRole("lePagination")
    expect(a).toBeInTheDocument();
    // expect(b).toBeInTheDocument();

  });


});