import Header from "components/Header";
import { mount } from "enzyme";
import "jsdom-global/register";
import React from "react";

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
