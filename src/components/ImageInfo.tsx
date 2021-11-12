import Check from "assets/icon/check.svg";
import LightBulb from "assets/icon/light-bulb.svg";
import { infoEnum } from "models";
import React from "react";

interface props {
  info: infoEnum;
}

const ImageInfo: React.FC<props> = ({ info }) => (
  <div className="image-info">
    {info === infoEnum.lowLight ? (
      <>
        <img src={LightBulb} alt="light bulb" />
        <p>Room lighting is too low</p>
      </>
    ) : (
      <>
        <img src={Check} alt="check" />
        <p>Picture taken!</p>
      </>
    )}
  </div>
);

export default ImageInfo;
