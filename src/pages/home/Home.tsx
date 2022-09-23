import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import Navbar from "../../components/navbar";
import { Button,message } from "antd";
import { environment } from "../../environments";
import axios from "axios";

export default function Home() {
  const [loginDetails,setloginDetails] = useState(Object);
  const [userImage,SetUserImage] = useState<any>();

  useEffect(() => {
    let objectData: any = localStorage.getItem("loginDetails");
    setloginDetails(JSON.parse(objectData));
  }, []);

  const fileUpload = ((event:any)=>{
    SetUserImage(event.target.files[0]) 
  })

  const uploadPhoto = ()=>{
    const formData = new FormData();
    formData.append('file', userImage);
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    axios.post(environment.baseUrl+'singleFile', formData,{headers:headers})
    .then(res => {
       message.success("photo upload successfully")
    })
    .catch(err => {
       console.log(err);
    });
  }
 
  return (
    <div>
      <Navbar/>
      <div className="home">
        <h1>Welcome</h1> 
       
      </div>
      <div className="userData">
        <h3>Email : {loginDetails.email}</h3>
      </div>
      <div className="userData" style={{paddingTop:"1rem"}}>
        <h3>Upload your photo</h3>
      </div>
      <div className="userData" style={{paddingRight:"1rem"}}>
        <input style={{paddingLeft:'6rem'}} type="file" onChange={fileUpload} accept="image/*" />
      </div>
      <div className="userData" style={{marginTop:"1rem"}}>
      <Button onClick={uploadPhoto}>Upload Photo</Button>
      </div>
   
    </div>
  );
}
