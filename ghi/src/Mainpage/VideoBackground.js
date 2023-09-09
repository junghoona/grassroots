import React from "react";
import videoBg from "../Assets/videoBg.mp4";

const VideoBackground = (props) => {
  const videoContainerStyle = {
    position: "relative",
    width: "100%",
    heigth: "100px",
    overflow: "hidden",
  };

  const videoBgStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "200px",
    zIndex: "-1",
  };

  const contentStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: `rgba(0, 0, 0, 0.5)`,
    color: "white",
  };

  return (
    <div>
      {props ? (
        <div className="video-container" style={videoContainerStyle}>
          <video autoPlay muted loop id="video-bg">
            <source src={videoBg} style={videoBgStyle} type="video/mp4" />
          </video>
          <div className="content-overlay">
            <div className="content" style={contentStyle}>
              <h1>Welcome!</h1>
              <p> Explore our environmentally friendly content </p>
              <button className="btn btn-primary">Join us</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="video-container">
          <video autoPlay muted loop id="video-bg">
            <source src={videoBg} type="video/mp4" />
          </video>
          <div className="content-overlay">
            <div className="content" style={contentStyle}>
              <h1>Welcome!</h1>
              <p> Explore our environmentally friendly content </p>
              <button className="btn btn-primary">Join us</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
