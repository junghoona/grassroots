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
    margin: "0",
    top: "25%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
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
    width: "150px",
    fontSize: "20px",
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
                  Bringing Communities Together for a More Hope-Inspired <br />
                  Pursuit of a Sustainable and Harmonious Future <br />
                </p>
                <Link
                  className="btn btn-primary mt-5"
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
