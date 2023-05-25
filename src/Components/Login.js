import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const handlesubmit = (e)=>{

        console.log(userName,password)
        const data = {email:userName,password:password}
        axios.post("https://reqres.in/api/login",data)
        .then((res)=>{
            console.log(res.data.token)
            if(res.data.token){
                localStorage.setItem('token',res.data.token)
                navigate("/home")
            }
        }).catch((err)=>{
            console.log(err)
        })
        e.preventDefault();
    }

  return (
    <div>
        <h1>Login Page</h1>
        <form>
        <label>UserName</label>
        <input type = "text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
        <br/>
        <br/>
        
        <label>Password</label>
        <input type = "text" value ={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <br/>
        <br/>

        <button onClick={handlesubmit}> Submit</button>
        </form>
       


      <Link to="/home">Home</Link>
    </div>
  )
}

export default Login
// eve.holt@reqres.in