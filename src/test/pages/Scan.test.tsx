import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { validateDocument } from "api/evaluation";
import Enzyme, { mount } from "enzyme";
import "jsdom-global/register";
import { Scan } from "pages";
import React from "react";
import { act } from "react-dom/test-utils";

const intervalTime = 2500;

const useLocationMock = jest.fn(() => ({
  state: { current: { image: "", isImageValid: null } },
}));

const useNavigateMock = jest.fn();
jest.mock("react-router-dom", () => ({
  useLocation: () => useLocationMock(),
  useNavigate: () => useNavigateMock,
}));

const useAlertMock = jest.fn();
jest.mock("react-alert", () => ({
  useAlert: () => ({
    error: useAlertMock,
  }),
}));

const responseMockError = { summary: { outcome: "Too Much Glare" } };
const responseMockSuccess = { summary: { outcome: "Approved" } };
jest.mock("api/evaluation", () => ({
  validateDocument: jest.fn(() => Promise.resolve(responseMockError)),
}));

Enzyme.configure({ adapter: new Adapter() });
describe("Scan", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<Scan />);
    expect(wrapper).toBeTruthy();
  });

  it("renders correctly the title", () => {
    const wrapper = mount(<Scan />);
    expect(wrapper.find("h2").text()).toBe("Take picture");
  });

  it("renders correctly the description", () => {
    const wrapper = mount(<Scan />);
    expect(wrapper.find(".instructions").text()).toBe(
      "Fit your ID card inside the frame.The picture will be taken automatically."
    );
  });

  it("shows the low light warning when image has not been scanned yet", () => {
    const wrapper = mount(<Scan />);
    expect(wrapper.find("ImageInfo")).toBeTruthy();
  });

  it("renders the cancel button", () => {
    const wrapper = mount(<Scan />);
    expect(wrapper.find(".cancel-button")).toBeTruthy();
  });

  it("renders the cancel button", () => {
    const wrapper = mount(<Scan />);
    wrapper.find(".cancel-button").props().onClick();

    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });

  it("sets a red border to the camera when image is rejected", async (done) => {
    jest.useFakeTimers();
    const wrapper = mount(<Scan />);
    act(() => {
      wrapper.find("Camera").props().onCanPlay();
    });
    jest.advanceTimersByTime(5000);
    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find("camera__border-error")).toBeTruthy();
      done();
    });
  });

  it("does not render the light warning when image has been rejected", async (done) => {
    jest.useFakeTimers();
    const wrapper = mount(<Scan />);
    act(() => {
      wrapper.find("Camera").props().onCanPlay();
    });
    jest.advanceTimersByTime(intervalTime);
    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find("ImageInfo").length).toBe(0);
      done();
    });
  });

  it("navigates to Home page when image has been accepted", async (done) => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (validateDocument as any).mockImplementationOnce(() =>
      Promise.resolve(responseMockSuccess)
    );
    const wrapper = mount(<Scan />);
    act(() => {
      wrapper.find("Camera").props().onCanPlay();
    });
    jest.advanceTimersByTime(intervalTime);
    setImmediate(() => {
      wrapper.update();
      expect(useNavigateMock).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("navigates to Home when click on cancel button", () => {
    jest.clearAllMocks();
    const wrapper = mount(<Scan />);
    wrapper.find(".cancel-button").props().onClick();
    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });

  it("shows an alert error when validate document fails", async (done) => {
    jest.useFakeTimers();
    (validateDocument as any).mockImplementationOnce(() => Promise.reject());
    const wrapper = mount(<Scan />);
    act(() => {
      wrapper.find("Camera").props().onCanPlay();
    });
    jest.advanceTimersByTime(intervalTime);
    setImmediate(() => {
      wrapper.update();
      expect(useAlertMock).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("stops the validation document interval when going to home", async (done) => {
    jest.clearAllMocks();
    jest.spyOn(global, "clearInterval");
    const wrapper = mount(<Scan />);
    act(() => {
      wrapper.unmount();
    });
    setImmediate(() => {
      wrapper.update();
      expect(clearInterval).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
