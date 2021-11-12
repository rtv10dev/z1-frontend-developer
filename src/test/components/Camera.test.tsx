import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Camera from "components/Camera";
import Enzyme, { mount } from "enzyme";
import "jsdom-global/register";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

const mockOnCanPlay = jest.fn();
const propsMock = {
  onCanPlay: mockOnCanPlay,
  innerRef: null,
  className: "mock classname",
};

describe("Camera", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<Camera {...propsMock} />);
    expect(wrapper).toBeTruthy();
  });

  it("renders the component with the passed props", () => {
    const wrapper = mount(<Camera {...propsMock} />);
    expect(wrapper.find("Webcam").props().onCanPlay).toBe(mockOnCanPlay);
    expect(wrapper.find("Webcam").props().innerRef).toBeFalsy();
    expect(wrapper.find("Webcam").props().className).toBe("mock classname");
  });

  it("renders the component with the default size when not constraints passed", () => {
    const wrapper = mount(<Camera {...propsMock} />);
    expect(wrapper.find("Webcam").props().width).toBe(289);
    expect(wrapper.find("Webcam").props().height).toBe(179);
  });

  it("renders the component with the audio deactivated when not audio passed", () => {
    const wrapper = mount(<Camera {...propsMock} />);
    expect(wrapper.find("Webcam").props().audio).toBeFalsy();
  });
});
