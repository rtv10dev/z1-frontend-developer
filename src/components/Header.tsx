import React from "react";

interface props {
  title: string;
}

const Header: React.FC<props> = (props) => {
  const { title } = props;
  return (
    <div className="header">
      <h1>{title}</h1>
      <hr />
    </div>
  );
};

export default Header;
