import { render } from "@testing-library/react";
import Home from "@/pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders homepage without crashing", () => {
    render(<Home />);
  });
});
