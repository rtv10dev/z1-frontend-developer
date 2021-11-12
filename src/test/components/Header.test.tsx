import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Header from "components/Header";
import Enzyme, { mount } from "enzyme";
import "jsdom-global/register";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<Header title="header title" />);
    expect(wrapper).toBeTruthy();
  });

  it("renders without crashing with the passed title", () => {
    const wrapper = mount(<Header title="header title" />);
    expect(wrapper.find("h1").text()).toBe("header title");
  });
});
