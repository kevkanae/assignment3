import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

test("Snapshot of Quiz component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <Home withData={() => {}} />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Home,", () => {
  test("can i see the loading text", () => {
    render(
      <BrowserRouter>
        <Home withData={() => {}} />
      </BrowserRouter>
    );

    let a = screen.getByRole("loading-text");
    expect(a).toBeInTheDocument();
  });
});

describe("axios call", () => {
  jest.setTimeout(20000);
  test("eh?", async () => {
    render(
      <BrowserRouter>
        <Home withData={() => {}} />
      </BrowserRouter>
    );

    await new Promise((r) => setTimeout(r, 10000));

    let a = screen.getByRole("table-cont");
    expect(a).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("row-0"));
  });
});
