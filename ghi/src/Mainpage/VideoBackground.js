import { Link } from "react-router-dom";
import videoBg from "../Assets/videoBg.mp4";
import React, { useState } from "react";

const VideoBackground = () => {
  const [buttonColor, setButtonColor] = useState("transparent");

  const videoContainerStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "200pv",
  };

  const videoBgStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    minWidth: "100%",
    height: "200px",
    zIndex: "-1",
  };

  const contentStyle = {
    position: "absolute",
    margin: "0",
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    // backgroundColor: `rgba(0, 0, 0, 0.5)`,
    fontFamily: "serif",
    color: "white",
  };

  const headerStyle = {
    fontSize: "100px",
  };

  const paragStyle = {
    fontSize: "25px",
  };

  const buttonStyle = {
    background: `${buttonColor}`,
    border: "solid",
  };

  return (
    <div>
      <div className="video-container" style={videoContainerStyle}>
        <video autoPlay muted loop id="video-bg">
          <source src={videoBg} style={videoBgStyle} type="video/mp4" />
        </video>
        <div className="content-overlay">
          <div className="content" style={contentStyle}>
            <div className="mt-5">
              <div className="text-center">
                <h1 style={headerStyle}>Welcome.</h1>
                <p style={paragStyle}>
                  Building Tomorrow's Communities Today <br />
                </p>
                <Link
                  className="btn btn-primary"
                  style={buttonStyle}
                  onMouseEnter={() => setButtonColor(`#EFEFEF`)}
                  onMouseLeave={() => setButtonColor(`transparent`)}
                  to={`/signup`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
