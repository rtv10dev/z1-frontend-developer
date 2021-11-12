import { mount } from "enzyme";
import "jsdom-global/register";
import { Home } from "pages";
import React from "react";

const useLocationMock = jest.fn(() => ({
  state: { current: { image: "", isImageValid: null } },
}));

const useNavigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: () => useLocationMock(),
  useNavigate: () => useNavigateMock,
}));

jest.mock("assets/icon/id-card.svg", () => <div>ID card</div>);

describe("Home", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<Home />);
    expect(wrapper).toBeTruthy();
  });

  it("renders correctly the title", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find("h2").text()).toBe("Scan your ID");
  });

  it("renders correctly the description", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find("p").text()).toBe(
      "Take a picture. It may take time to validate your personal information."
    );
  });

  it("renders the id card image when there is no image", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find("img").props().src.props.children).toBe("ID card");
  });

  it("renders the take picture button when there is no image", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find("Button").text()).toBe("Take picture");
  });

  it("renders the take picture button when there is no image", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find("Button").text()).toBe("Take picture");
  });

  it("navigates to scan when on click take picture", () => {
    const wrapper = mount(<Home />);
    wrapper.find("Button").props().onClick();
    expect(useNavigateMock).toHaveBeenCalled();
  });

  it("renders the scanned image result", () => {
    useLocationMock.mockImplementationOnce(
      jest.fn(() => ({
        state: { current: { image: "mock image", isImageValid: true } },
      }))
    );
    const wrapper = mount(<Home />);
    expect(wrapper.find("ImageResult")).toBeTruthy();
  });

  it("navigates to scan when click on retake picture", () => {
    jest.clearAllMocks();
    useLocationMock.mockImplementationOnce(
      jest.fn(() => ({
        state: { current: { image: "mock image", isImageValid: false } },
      }))
    );
    const wrapper = mount(<Home />);
    wrapper.find("Button").props().onClick();
    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });

  it("renders the id card when there is image but it is not validated", () => {
    useLocationMock.mockImplementationOnce(
      jest.fn(() => ({
        state: { current: { image: "mock image", isImageValid: null } },
      }))
    );
    const wrapper = mount(<Home />);
    expect(wrapper.find("ImageResult").length).toBe(0);
  });
});
