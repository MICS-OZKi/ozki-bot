import { render } from "@testing-library/react";
import GoogleLogin from "@/pages/google-login";
import "@testing-library/jest-dom";

describe("Google Login", () => {
  it("renders google login without crashing", () => {
    render(<GoogleLogin />);
  });
});
