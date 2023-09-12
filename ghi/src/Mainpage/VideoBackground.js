import React from "react";
import { Link } from "react-router-dom";
import videoBg from "../Assets/videoBg.mp4";

const VideoBackground = () => {
  const videoContainerStyle = {
    position: "relative",
    overflow: "hidden",
    width: "138vh",
    height: "500px",
  };

  const videoBgStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "auto",
    height: "200px",
    zIndex: "-1",
  };

  const contentStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "138vh",
    height: "100%",
    backgroundColor: `rgba(0, 0, 0, 0.5)`,
    color: "white",
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
                <h1>Welcome!</h1>
                <p> Explore our environmentally friendly content </p>
                <Link className="btn btn-primary" to={`/signup`}>
                  Join us
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
