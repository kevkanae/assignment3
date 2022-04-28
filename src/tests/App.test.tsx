import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

test("Snapshot of App component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});
