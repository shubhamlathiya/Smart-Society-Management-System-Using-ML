import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function FaceAttendance() {
  const webcamRef = useRef(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const registerFace = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const res = await axios.post("http://127.0.0.1:5000/register", {
      name,
      image: imageSrc,
    });
    setMessage(res.data.message);
  };

  const markAttendance = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const res = await axios.post("http://127.0.0.1:5000/attendance", {
      image: imageSrc,
    });
    setMessage(res.data.message);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <br />
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      />
      <br />
      <button onClick={registerFace} style={{ margin: "5px" }}>Register Face</button>
      <button onClick={markAttendance} style={{ margin: "5px" }}>Mark Attendance</button>
      <h3>{message}</h3>
    </div>
  );
}
