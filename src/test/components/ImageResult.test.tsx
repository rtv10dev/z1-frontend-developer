import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ImageResult from "components/ImageResult";
import Enzyme, { mount } from "enzyme";
import "jsdom-global/register";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

const onClickMock = jest.fn();

const propsMock = {
  image: "mock image",
  isValid: true,
  onClickButton: onClickMock,
  buttonText: "button text",
};

jest.mock("assets/icon/check-solid.svg", () => <div>check-solid icon</div>);
jest.mock("assets/icon/cross.svg", () => <div>cross icon</div>);

describe("ImageResult", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<ImageResult {...propsMock} />);
    expect(wrapper).toBeTruthy();
  });

  it("renders the passed image", () => {
    const wrapper = mount(<ImageResult {...propsMock} />);
    expect(wrapper.find(".image-result").props().src).toBe("mock image");
  });

  it("shows status as success when status of the image is success", () => {
    const wrapper = mount(<ImageResult {...propsMock} />);
    expect(
      wrapper.find(".status-container img").props().src.props.children
    ).toBe("check-solid icon");
    expect(wrapper.find(".status-container").text()).toBe("Accepted");
  });

  it("shows status as rejected when status of the image is rejected", () => {
    const wrapper = mount(<ImageResult {...propsMock} isValid={false} />);
    expect(
      wrapper.find(".status-container img").props().src.props.children
    ).toBe("cross icon");
    expect(wrapper.find(".status-container").text()).toBe("Rejected");
  });

  it("renders the button", () => {
    const wrapper = mount(<ImageResult {...propsMock} />);
    expect(wrapper.find("button")).toBeTruthy();
  });

  it("calls onClickButton when click on the button", () => {
    const wrapper = mount(<ImageResult {...propsMock} />);
    wrapper.find("button").props().onClick();
    expect(onClickMock).toHaveBeenCalled();
  });

  it("does not render button when not onClickButton passed", () => {
    const wrapper = mount(<ImageResult {...propsMock} onClickButton={null} />);
    expect(wrapper.find("button").length).toBe(0);
  });
});
