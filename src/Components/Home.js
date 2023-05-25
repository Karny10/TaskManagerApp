import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
   
 useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate('/login')
    }
 })

 const [tasks,setTasks]=useState([
//     {
//     id:1,
//     title:"Work with developers",
//     description:"Work with developers to fullfill clients requirements"
// },{
//     id:2,
//     title:"Learn Unit testing",
//     description: "Learn Unit testing and do a certification on it"
// }
]) 
    
  return (
    <div>
      Home Page
      <button onClick={()=>{localStorage.clear() 
        navigate("/login")}}>Logout</button>

        <h1>Tasks</h1>
        {
            tasks.map((ele,index)=>{
            return <div>
                <ul>
                    <li key ={ele.id} style={{background :"skyblue"}}>
                        <p>Task:{ele.title}</p><p>Description: {ele.description}</p>
                    </li>
                </ul>
            </div>
            })}
    </div>
  )
}

export default Home
