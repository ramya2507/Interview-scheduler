import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointmetn from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});