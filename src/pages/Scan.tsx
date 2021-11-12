import { validateDocument } from "api/evaluation";
import Camera from "components/Camera";
import ImageInfo from "components/ImageInfo";
import useIsMounted from "hooks/useIsMounted";
import { infoEnum, OutcomeValues } from "models";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const captureIntervalTime = 2500;

const Scan: React.FC = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);
  const stateRef = useRef({});
  const isMounted = useIsMounted();
  const [isImageValid, setIsImageValid] = useState(null);

  const goToHome = () => {
    navigate("/", { state: stateRef });
  };

  const startCapturing = useCallback(() => {
    intervalRef.current = setInterval(async () => {
      const imgSrc: string = webcamRef.current?.getScreenshot();
      try {
        const validationResponse = await validateDocument(imgSrc);
        if (isMounted()) {
          const isImageValid =
            validationResponse.summary.outcome === OutcomeValues.success;
          stateRef.current = { image: imgSrc, isImageValid: isImageValid };
          setIsImageValid(isImageValid);
          if (isImageValid) {
            clearInterval(intervalRef.current);
            goToHome();
          }
        }
      } catch (err) {
        isMounted() &&
          alert.error(
            "Oops, something went wrong when validating your ID card"
          );
      }
    }, captureIntervalTime);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="scan-container">
      <h2>Take picture</h2>
      <div className="instructions">
        <p>Fit your ID card inside the frame.</p>
        <p>The picture will be taken automatically.</p>
      </div>
      <Camera
        innerRef={webcamRef}
        className={`camera__border ${
          isImageValid === false ? "camera__border-error" : ""
        }`}
        onCanPlay={startCapturing}
      />
      {isImageValid === null && <ImageInfo info={infoEnum.lowLight} />}
      <button className="cancel-button" onClick={() => goToHome()}>
        Cancel
      </button>
    </div>
  );
};

export default Scan;
