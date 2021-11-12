import Check from "assets/icon/check-solid.svg";
import Cross from "assets/icon/cross.svg";
import React from "react";
import Button from "./Button";

interface props {
  image: string;
  isValid: boolean;
  onClickButton?: () => void;
  buttonText?: string;
}

const ImageResult: React.FC<props> = (props) => {
  const { image, isValid, onClickButton, buttonText } = props;
  const statusClassName = isValid ? "success" : "error";
  return (
    <div className={`image-result-container`}>
      <img
        className={`image-result ${statusClassName}`}
        src={image}
        alt="Scanned image"
      />
      <div className={`status-container ${statusClassName}`}>
        <img src={isValid ? Check : Cross} alt="Status icon" />
        <span>{isValid ? "Accepted" : "Rejected"}</span>
      </div>
      {onClickButton && <Button text={buttonText} onClick={onClickButton} />}
    </div>
  );
};

export default ImageResult;
