import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import Navbar from "../../components/navbar";
import { Button, message } from "antd";
import { environment } from "../../environments";
import axios from "axios";
import { alertMessages } from "../../Global/constants";

export default function Home() {
  const [loginDetails, setloginDetails] = useState(Object);
  const [userImage, SetUserImage] = useState<any>();
  const [userImg, setUserimg] = useState<any>();
  const [success,SetSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    let objectData: any = localStorage.getItem("loginDetails");
    const token: any = localStorage.getItem("access-token");
    setAccessToken(token);
    setloginDetails(JSON.parse(objectData));
    const headers = {
        Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .get(environment.baseUrl + "getSingleFiles", { headers: headers })
      .then((res) => {
        setUserimg(res.data.results[0].filePath);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success,accessToken]);

  const fileUpload = (event: any) => {
    SetUserImage(event.target.files[0]);
  };

  const uploadPhoto = () => {
    const formData = new FormData();
    formData.append("file", userImage);
    const headers = {
        Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(environment.baseUrl + "singleFile", formData, { headers: headers })
      .then((res) => {
        message.success(alertMessages.userUpload.success);
        SetSuccess(true)
      })
      .catch((err) => {
        message.error(alertMessages.userUpload.error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="profile">
        {userImg && ( <img src={environment.baseUrl + userImg} width="200" height="200" alt="userimage" style={{borderRadius:"50%"}} />)}
      </div>
      <div className="home">
        <h1>Welcome</h1>
      </div>
      <div className="userData">
        <h3>Email : {loginDetails.email}</h3>
      </div>
      <div className="userData" style={{ paddingTop: "1rem" }}>
        <h3>Upload your photo</h3>
      </div>
      <div className="userData" style={{ paddingRight: "1rem" }}>
        <input
          style={{ paddingLeft: "6rem" }}
          type="file"
          onChange={fileUpload}
          accept="image/*"
        />
      </div>
      <div className="userData" style={{ marginTop: "1rem" }}>
        <Button onClick={uploadPhoto}>Upload Photo</Button>
      </div>
    </div>
  );
}
