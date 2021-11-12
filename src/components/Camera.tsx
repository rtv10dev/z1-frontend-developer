import React, { LegacyRef } from "react";
import Webcam from "react-webcam";

interface props {
  videoConstraints?: {
    height: number;
    width: number;
    facingMode: { exact: "environment" };
  };
  onCanPlay?: () => void;
  innerRef?: LegacyRef<Webcam>;
  audio?: boolean;
  className?: string;
}

const Camera: React.FC<props> = (props) => {
  const {
    videoConstraints = { width: 289, height: 179 },
    onCanPlay,
    innerRef,
    audio = false,
    className,
  } = props;
  return (
    <Webcam
      audio={audio}
      height={videoConstraints.height}
      ref={innerRef}
      width={videoConstraints.width}
      videoConstraints={videoConstraints}
      className={className}
      onCanPlay={onCanPlay}
    />
  );
};

export default Camera;
