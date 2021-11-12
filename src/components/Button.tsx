import React from "react";

interface props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<props> = (props) => {
  const { text, onClick } = props;
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
