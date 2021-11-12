import IdCard from "assets/icon/id-card.svg";
import Button from "components/Button";
import Header from "components/Header";
import ImageResult from "components/ImageResult";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const goToScan = () => {
    navigate("scan");
  };

  return (
    <div>
      <Header title="BankClient" />
      <div className="home-container">
        <h2>Scan your ID</h2>
        <p>
          Take a picture. It may take time to validate your personal
          information.
        </p>
        {state?.current.image && state?.current.isImageValid !== null ? (
          <ImageResult
            image={state.current.image}
            isValid={state.current.isImageValid}
            onClickButton={!state?.current.isImageValid && goToScan}
            buttonText="Retake picture"
          />
        ) : (
          <div className="image">
            <img src={IdCard} alt={"id card"} />
            <Button text="Take picture" onClick={goToScan} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
