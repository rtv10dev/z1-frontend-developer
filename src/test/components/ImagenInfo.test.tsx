import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ImageInfo from "components/ImageInfo";
import Enzyme, { mount } from "enzyme";
import "jsdom-global/register";
import { infoEnum } from "models";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("ImageInfo", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<ImageInfo info={infoEnum.lowLight} />);
    expect(wrapper).toBeTruthy();
  });

  it("renders the light bulb icon when passed info is low light", () => {
    const wrapper = mount(<ImageInfo info={infoEnum.lowLight} />);

    expect(wrapper.find("img").props().alt).toBe("light bulb");
  });

  it("renders the text 'Room lighting is too low' when passed info is low light", () => {
    const wrapper = mount(<ImageInfo info={infoEnum.lowLight} />);
    expect(wrapper.find("ImageInfo").text()).toBe("Room lighting is too low");
  });

  it("renders the check icon when passed info is taken", () => {
    const wrapper = mount(<ImageInfo info={infoEnum.taken} />);

    expect(wrapper.find("img").props().alt).toBe("check");
  });

  it("renders the text 'Room lighting is too low' when passed info is low light", () => {
    const wrapper = mount(<ImageInfo info={infoEnum.taken} />);
    expect(wrapper.find("ImageInfo").text()).toBe("Picture taken!");
  });
});
