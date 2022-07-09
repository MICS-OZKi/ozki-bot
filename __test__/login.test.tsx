import { render } from "@testing-library/react";
import Login from "@/pages/login";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));
describe("Login", () => {
  it("renders login page without crashing", () => {
    render(<Login />);
  });
});
