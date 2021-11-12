import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Button from "components/Button";
import Enzyme, { mount } from "enzyme";
import "jsdom-global/register";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Button", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<Button text="button text" onClick={() => {}} />);
    expect(wrapper).toBeTruthy();
  });

  it("renders the button with passed text", () => {
    const wrapper = mount(<Button text="button text" onClick={() => {}} />);
    expect(wrapper.find("button").text()).toBe("button text");
  });

  it("calls passed on click function when on click button", () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<Button text="button text" onClick={mockOnClick} />);
    wrapper.find("button").props().onClick();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
