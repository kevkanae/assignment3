import { render, screen } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import Details from "../pages/Details";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "/post",
        state: "A"
    })
}));

describe("<ExampleComponent />", () => {
    it("should render ExampleComponent", () => {
        render(<BrowserRouter><Details/></BrowserRouter>);

        let btn = screen.getByText(/Go Back/i)
        expect(btn).toBeInTheDocument()
    });
});
