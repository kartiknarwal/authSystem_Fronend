import React from 'react'
import { useState } from 'react'

import './mix.css'
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [passShow,setPassShow]=useState(false);
    const [cpassShow,setCPassShow]=useState(false);

    const [inpval,setInpval]=useState({
        fname:"",
        email:"",
        password:"",
        cpassword:""
    });


    const setVal =(e)=>{
        // console.log(e.target.value);
        const  {name,value}=e.target
        setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
        })
    }
const addUserdata = async(e)=>{
    e.preventDefault()
    const {fname,email,password,cpassword}=inpval

    if(fname==="")
    {
        alert("please Enter Your Name");
    }else if(email ===""){
        alert("please Enter Your Email");
    }else if(!email.includes("@")){
        alert("Enter Valid Email Address");
    }else if(password===""){
        alert("Please Enter Your Password");
    }else if(password.length <8){
        alert("Password length must br at leaset 8 charcters")
    }else if(cpassword ===""){
        alert("please Confirm your Password");
    }else if(cpassword.length<8){
        alert("password must be atleast 8 charcters long");
    }else if(password !==cpassword){
        alert("password and confirm Password not match Enter Carefully");
    }else{

        
        // console.log("user registeration successfully done");
        const data =await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,email,password,cpassword
            })
        });

        const  res =await data.json();
        // console.log(res);
        if(res.status === 201){
            alert("user Registeration Successfully done");
            setInpval({...inpval,fname:"",email:"",password:"",cpassword:""})
        }
    }
}

  return (
    <>
           <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Sign Up</h1>
                <p style={{textAlign:"center"}}>Hi, we are glad you will be using our webpage .<br/>
                     We hope that you will get like it</p>
            </div>

            <form >
                <div className="form_input">
                    <label htmlFor="fname">Name</label>
                    <input type="fname" onChange={setVal}value={inpval.fname} name="fname" id="fname" placeholder='Enter your Name'/>
                </div>
                <div className="form_input">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={setVal}value={inpval.email} name="email" id="email" placeholder='Enter your Email Address'/>
                </div>
                <div className="form_input">
                    <label htmlFor="password">Password</label>
                    <div className="two">
                        <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter your Password '/>
                        <div className="showpass" onClick={()=>setPassShow(!passShow)}> 
                             {!passShow ?"Show" : "Hide"}
                        </div>
                    </div>
                </div>
                <div className="form_input">
                    <label htmlFor="cpassword"> Confirm Password</label>
                    <div className="two">
                        <input type={!cpassShow ? "password" : "text"} onChange={setVal}value={inpval.cpassword} name="cpassword" id="cpassword" placeholder='Confirm your Password '/>
                        <div className="showpass" onClick={()=>setCPassShow(!cpassShow)}> 
                             {!cpassShow ?"Show" : "Hide"}
                        </div>
                    </div>
                </div>

                    <button className="btn" onClick={addUserdata}>Sign Up</button>
                    <p>Already have an account?<NavLink to="/">Log In</NavLink></p>
            </form>
        </div>
     </section>

    </>
  )
}

export default Register
