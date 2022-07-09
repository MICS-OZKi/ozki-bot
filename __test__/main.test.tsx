import { render } from "@testing-library/react";
import Main from "@/pages/main";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));
describe("Main", () => {
  it("renders main page without crashing", () => {
    render(<Main setIsExitButton={() => {}} />);
  });
});
