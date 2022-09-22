import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import Navbar from "../../components/navbar";

export default function Home() {
  const [loginDetails,setloginDetails] = useState(Object)

  useEffect(() => {
    let objectData: any = localStorage.getItem("loginDetails");
    setloginDetails(JSON.parse(objectData));
  }, []);

  // const fileUpload = ((event:any)=>{
  //   const file = event.target.files[0];
  // })
 
  return (
    <div>
      <Navbar/>
      <div className="home">
        <h1>Welcome</h1> 
       
      </div>
      <div className="userData">
        <h3>Email : {loginDetails.email}</h3>
      </div>
      {/* <div className="userData" style={{paddingTop:"1rem"}}>
        <h3>Upload your photo</h3>
      </div>
      <div className="userData">
        <input style={{paddingLeft:'2rem'}} type="file" onChange={fileUpload} />
      </div> */}
   
    </div>
  );
}
