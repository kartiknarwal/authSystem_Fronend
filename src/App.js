import Header from "./components/Header";
import Login from "./components/Login";
import {Routes,Route} from 'react-router-dom'
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import  CircularProgress  from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import { useEffect,useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "./components/ContextProvider/Context";



function App() {
  const [data,setData] =useState(false);
  const {logindata,setLoginData} =useContext(LoginContext);
    const history =useNavigate();


  const DashboardValid =async()=>{
    let token  =localStorage.getItem("usersdatatoken");
    const res =await fetch("/validuser",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":token
        }
    });

    const data =await res.json();
    if(data.status ==401 || !data){
       console.log("user not valid");
    }else{
      console.log("user verify");
      setLoginData(data);
      history("/dashboard")
    }
}

useEffect(()=>{
  setTimeout(() => {
    DashboardValid();
    setData(true);
  },2000);
},[])


  return (
    <>
    {
      data ?(
      <>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="*" element ={<Error/>}/>
      </Routes>
      </>
      ): <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:"100vh"}}>
        Loading... &nbsp;
       <CircularProgress/>
      </Box>
    }
      
    </>
  );
}

export default App;
